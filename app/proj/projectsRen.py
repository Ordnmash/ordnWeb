import ast
import json


class Projects:
  def __init__(self, file:str):
    self.file = file 
    with open(self.file, "r") as f:
      self.projects:list = json.load(f)

  def getData(self):
    return self.projects

  def writeToText(self):
    """edit the attribute .projects before writing if you want to apply changes..."""
    dataastext:str = json.dumps(self.projects)
    with open(self.file, 'w') as f:
      f.write(dataastext)

  def addData(self, newData: dict):
    if not isinstance(newData, dict):
      return

    if len(newData) != len(self.projects[0]):
      return

    self.projects.append(newData)
    self.writeToText()
    return 1

  def removeData(self, indx:int):
    if indx > len(self.projects):
      return
    self.projects.pop(indx)
    self.writeToText()
    return 1

  def editData(self, indx:int, key:str,value:str):
    if indx > len(self.projects):
      return

    prev = self.projects[indx]
    prev[key] = value
    self.projects[indx] = prev
    self.writeToText()
    return 1