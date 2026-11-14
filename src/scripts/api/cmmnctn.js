import { displayProjects, displayDetails } from "../script.js";


const URL = window.location.hostname === "localhost"
    ? "http://127.0.0.1:8080"
    : window.location.origin;


async function getDetails(){
  try{
    const urlRes = await fetch(`${URL}/user/details`);
    if (urlRes.ok){
      const data = await urlRes.json();
      displayDetails(data);
    }
    else{
      console.error("something wrong with the url response...");
    }
  }
  catch(err){
    console.error(err);
  }
}


async function registerID(){
  try{
    if (!localStorage.getItem("uid")){
    
      const resID  = await fetch(`${URL}/adduser`);
      const newID  = await resID.json();
      localStorage.setItem("uid", newID.uid);
    }
  } catch(err){
    console.error(err);
  }
}


export async function getProjects(){
  try{
    const urlRes = await fetch(`${URL}/user/projects`,{method:"GET"});
    if (urlRes.ok){
      const data = await urlRes.json();
      displayProjects(data);
    }
    else{
      console.error(urlRes);
    }
  }
  catch(err){
    console.error(err);
  }
}


registerID();
getDetails();
getProjects();