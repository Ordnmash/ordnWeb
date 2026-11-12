import ast
from pathlib import Path

base_dir = Path(__file__).resolve().parent

file = base_dir / "tokenIDs.txt"

def encdec() -> list[dict]:
  tokenSet = open(file, "r").read().splitlines()
  encs = []
  for line in tokenSet[:2]:
    encs.append(ast.literal_eval(line))

  return encs # returns stoi/itos