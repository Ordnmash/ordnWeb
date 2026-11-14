import {showBotResponse} from '../chatfrontend.js';


const URL = window.location.hostname === "localhost"
    ? "http://127.0.0.1:8080"
    : window.location.origin;

export async function getResponse(prompt){ 

  try{
  
    const uid = localStorage.getItem("uid");
    if (uid != "null"){
      const urlRes = await fetch(`${URL}/lmchat?prompt=${prompt}&uid=${uid}`);
    
      if (urlRes.ok){
        const data = await urlRes.json();
        showBotResponse(data.response); 
      }
      else{
        console.error("URL response has failed...");
      }
    } 
  }
  catch(err){
    console.log(err);
  }
}

export function routeTo(file){
  window.location.href = `${file}`;
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

registerID(); // as soon the landing page loads...

export async function deletehist(uid){
  try{
    const urlRes = await fetch(`${URL}/lmchat?uid=${uid}`, {method: "DELETE"});
    return urlRes;
  } 
  catch(err){
    console.error(err);
  }
}