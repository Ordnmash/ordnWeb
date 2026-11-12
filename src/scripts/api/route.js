import {showBotResponse} from '../chatfrontend.js';


const URL = "http://127.0.0.1:8080";

export async function getResponse(prompt){ 

  try{
  
    const src = JSON.stringify(localStorage.getItem("miniLM/chats/source"));
    if (src != "null"){
      const urlRes = await fetch(`${URL}/lmchat?prompt=${prompt}&source=`);
    
      if (urlRes.ok){
        const data = await urlRes.json();
        localStorage.setItem("miniLM/chats/source", data.source);
        showBotResponse(data.response); 
      }
      else{
        console.error("URL response has failed...");
      }
    } 
    else{
      const urlRes = await fetch(`${URL}/lmchat?prompt=${prompt}&source=`);
    
      if (urlRes.ok){
        const data = await urlRes.json();
        localStorage.setItem("miniLM/chats/source", data.source);
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