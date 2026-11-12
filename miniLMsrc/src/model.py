import torch
import torch.nn as nn

from pathlib import Path
base_dir = Path(__file__).resolve().parent

from miniLMsrc.build import tool
from miniLMsrc.build import dep


wei_path = base_dir / "miniLM.pt"

class miniLM(nn.Module):
  """ a tiny language model from scratch """
  # APIs
  forward = tool.forward
  gn      = tool.generate
  lpe     = tool.LearnedPE

  stoi,itos  = dep.encdec()

  # model hyperParameters
  n_embed    = 1024
  n_hidden   = 768
  num_heads  = 8
  vocab_size = len(stoi)
  batch_size = 16
  block_size = 512
  lr         = 1e-3

  def __init__(self, file=wei_path):

    super().__init__()
    
    self.embed= nn.Sequential(
      nn.Embedding(self.vocab_size, self.n_embed), self.lpe(self.block_size, self.n_embed),
    )
    self.mha1 = nn.MultiheadAttention(self.n_embed,  self.num_heads, dropout=0.2, batch_first=True)
    self.ffn1 = nn.Sequential(nn.Linear(self.n_embed, self.n_embed, bias=False),
                                   nn.LayerNorm(self.n_embed),  nn.Tanh())
    self.ffn2 = nn.Sequential(nn.Linear(self.n_embed,self.n_hidden, bias=False),
                                    nn.LayerNorm(self.n_hidden), nn.GELU())
    self.lgts = nn.Linear(self.n_hidden, self.vocab_size, bias=True)

    # load the saved model
    try:
      self.load_state_dict(torch.load(file, weights_only=True))
      print("Loaded saved model from miniLM.pt")

    except FileNotFoundError:
      print("No saved model found. Initializing with random weights.")
    
    self.eval()
    print(f"total parameters = {sum(p.nelement() for p in self.parameters())}")

model = miniLM()