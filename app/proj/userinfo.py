import ast


class Details:
  def __init__(self, file:str):
    self.file = file
    self.details:dict = ast.literal_eval(open(self.file, "r").read())

  def getData(self):
    return self.details