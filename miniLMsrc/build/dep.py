import ast

file = "/home/ordn/projects/ordnWeb/miniLMsrc/build/chat_learnedData.txt"

def encdec() -> list[dict]:
  tokenSet = open(file, "r").read().splitlines()
  encs = []
  for line in tokenSet[:2]:
    encs.append(ast.literal_eval(line))

  return encs # returns stoi/itos