from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from pydantic import BaseModel

from pathlib import Path

from proj.projectsRen import Projects
from miniLMsrc.model import miniLM

import ast


base_dir = Path(__file__).resolve().parent

userfile:str = base_dir / "users.txt"
users:list   = ast.literal_eval(open(userfile, "r").read())

miniLM = miniLM()

app = FastAPI()

templates = Jinja2Templates(directory="src")


app.mount("/static", StaticFiles(directory="src/"), "static")

# endPoint configurations...
# ^^^^^^^^^^^^^^^^^^^^^^^^^^
@app.get("/adduser")
def addUser():
  newID = len(users)
  users.append({"id":newID,"chatsrc":""})
  with open(userfile, 'w') as f:
    f.write(f"{users}")
  return {"uid":newID}

@app.get("/")
def homePage(request: Request):
  return templates.TemplateResponse(request, "pages/index.html")

@app.get("/chat")
def chatspace(request: Request):
  return templates.TemplateResponse(request, "pages/ordnchat.html")


@app.get("/lmchat")
def chat(prompt: str, uid:int):

  source:str   = users[uid]["chatsrc"]
  res, tm, src = miniLM.gn(prompt, source)

  users[uid]["chatsrc"] = src
  with open(userfile, "w") as f:
    f.write(f"{users}")

  data = {
    "response": res,
    "time":tm
  }

  return data

@app.delete("/lmchat")
def deleteChat(uid:int):
  users[uid]["chatsrc"] = ""
  with open(userfile, "w") as f:
    f.write(f"{users}")

  return {"res":"OK"}


detfile = base_dir / "proj/ordn.json"

# details
@app.get("/user/details")
def returnDetails():

  from proj.userinfo import Details as dt
  Details = dt(detfile)
  
  return Details.getData()


projfile = base_dir / "proj/projects.txt"
Projects = Projects(projfile)

class PrjPost(BaseModel):
  title:str   = ""
  content:str = ""
  img:str     = ""
  link:str    = ""
  nameLink:str= ""


@app.get("/user/projects")
def returnProjects():
  return Projects.getData()

@app.post("/user/projects")
def addProject(data: PrjPost):
  newdata:dict = {
    "title"   :data.title,
    "content" :data.content,
    "img"     :data.img,
    "link"    :data.link,
    "nameLink":data.nameLink
    }

  Projects.addData(newdata)
  return {"res":"OK"}

@app.delete("/user/projects")
def delProject(idx: int):
  Projects.removeData(idx)
  return {"res":"OK"}

@app.patch("/user/projects")
def editProject(idx:int, key:str, content:str):
  Projects.editData(idx, key, content)
  return {"res":"OK"}


@app.get("/admin")
def adminPage(request: Request):
  return templates.TemplateResponse(request, "pages/ddfoethert.html")