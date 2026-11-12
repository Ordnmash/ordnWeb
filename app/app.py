from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from pydantic import BaseModel

from miniLMsrc.model import miniLM
miniLM = miniLM()


app = FastAPI()

templates = Jinja2Templates(directory="src")

app.mount("/static", StaticFiles(directory="src/"), "static")


# endPoint configurations...
# ^^^^^^^^^^^^^^^^^^^^^^^^^^
@app.get("/")
def homePage(request: Request):
  return templates.TemplateResponse(request, "pages/index.html")

@app.get("/chat")
def chatspace(request: Request):
  return templates.TemplateResponse(request, "pages/ordnchat.html")


@app.get("/lmchat")
def chat(prompt: str, source:str):
  
  res, tm, src = miniLM.gn(prompt=prompt, src=source)
  data = {
    "response": res,
    "time":tm,
    "source":src,
  }
  print(data)
  return data

detfile = "/home/ordn/projects/ordnWeb/app/proj/ordn.json"

# details
@app.get("/user/details")
def returnDetails():

  from proj.userinfo import Details as dt
  Details = dt(detfile)
  
  return Details.getData()

import os

projfile = "/home/ordn/projects/ordnWeb/app/proj/projects.json"

from proj.projectsRen import Projects
Projects = Projects(projfile)


@app.get("/user/projects")
def returnProjects():

  return Projects.getData()

class PrjPost(BaseModel):
  head:str    = ""
  details:str = ""
  img:str     = ""

@app.post("/user/projects")
def editPrj(data: PrjPost):
  newdata:dict = {
    "head"   :data.head,
    "details":data.details,
    "img"    :data.img
    }

  Projects.addData(newdata)