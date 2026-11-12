import torch
import torch.nn as nn
#import torch.optim as optim;  not useful for production
import torch.nn.functional as F

import time
import json

# encoding and decoding tools:
def encode(s, stoi):
  d = []
  for si in s:
    d.append(stoi[si])
  return d

def decode(l, itos):
  d = []
  for li in l:
    d.append(itos[li])
  return ''.join(d)

def tknEncoder(s, stoi, itos):

  voc     = list(reversed(stoi.keys()))
  tokens  = []
  def iterate(x):
    largT = sorted(stoi.keys(), key=lambda x: len(x))[-1]
    if len(x) > len(largT): x = x[:len(largT)] # saves computation time.
    while len(x) > 0:
      if x in voc:
        return stoi[x]
      else:
        x = x[:-1]

  while len(s) > 0:
    token = iterate(s)
    tokens.append(token)
    s = s[len(itos[token]):]

  return tokens 


class LearnedPE(nn.Module):
  def __init__(self, max_seq_len:int, n_embed:int):
    super().__init__()
    self.emb = nn.Embedding(max_seq_len, n_embed)

  def forward(self,x):
    # x = [B, T, C]
    _,T,_   = x.shape
    seq_len = T
    inn     = torch.arange(0, seq_len)
    out     = self.emb(inn)
    return x + out


def forward(self, x, targets=None):
  xem    = self.embed(x)  # [B, T, C]
  _,T,_  = xem.shape
  mask   = torch.triu(torch.ones(T, T), 1).bool()
  x,_    = self.mha1(xem,xem,xem, attn_mask=mask)
  xem    = xem + x        # [B, T, C]
  x      = self.ffn1(xem) # [B, T, C]
  xrb    = x + xem        # [B, T, C]
  x      = self.ffn2(xrb) # [B, T, Nh]
  logits = self.lgts(x)   # [B, T, Vs]
# logits = [B, T, Vs]  targets = [B, T]

  if targets is not None: # cross_entropy expects logits [B, Vs, T], targets [B, T]
    logits = logits.transpose(1,2)
    loss   = F.cross_entropy(logits, targets)
  else:
    loss   = None

  return logits, loss


        
def generate(self, prompt:str, src:str):
    src = json.loads(src) if src else src
    print(src)
    
    self.eval()
    text  = ''
    formats = {'humanStart':"<start_of_turn>user\n", 
               'end':"<end_of_turn>\n", 
               'aiStart':"<start_of_turn>model\n"}

    prompt = src + formats['humanStart'] + prompt + formats['end'] + formats['aiStart']
  
    # start sampling from the model...
    inn = torch.tensor(tknEncoder(prompt, self.stoi, self.itos)).unsqueeze(0) # [1,T]
    
    t0 = time.perf_counter()
    while True:
      logits, _ = self(inn)
      ixlogits  = logits[0, -1]
      probs     = F.softmax(ixlogits, dim=-1)
      ix        = torch.multinomial(probs, num_samples=1).item()

      if "<end_of_turn>" not in text:
        lin   = inn.view(-1).tolist(); lin.append(ix)
        if len(lin) > self.block_size:
          lin = lin[1:]
        inn   = torch.tensor(lin).unsqueeze(0) # [1,T,C]
        text += self.itos[ix]
        
      else:
        ntext = ''
        # we want to split the text with <end_of_turn> and only keep the first part of the text, which is the model's response to the user input.
        for t in text.split("<end_of_turn>"):
          if t != '':
            ntext += t
            break
          break
        text = ntext
        break

    t1 = time.perf_counter()
    source = prompt + text + formats['end']
        
    return (text, f"{t1-t0:.2f}", source)