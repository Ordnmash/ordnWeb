import ast


class Projects:
  def __init__(self, file:str):
    self.file = file
    self.f    = open(self.file, 'r').read()
    self.projects:list = ast.literal_eval(self.f)

  def getData(self):
    return self.projects

  def writeToText(self):
    """edit the attribute .projects before writing if you want to apply changes..."""
    with open(self.file, 'w') as f:
      f.write(f"{self.projects}")

  def addData(self, newData: dict):

    self.projects.append(newData)
    self.writeToText()

  def removeData(self, indx:int):
    self.projects.pop(indx)
    self.writeToText()
    

  def editData(self, indx:int, key:str,value:str):
  
    prev = dict(self.projects[indx])
    prev[key] = value
    self.projects[indx] = prev
    self.writeToText()