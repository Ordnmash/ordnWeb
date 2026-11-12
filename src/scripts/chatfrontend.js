import { getResponse } from "./api/route.js";
import { routeTo } from "./api/route.js";

const log = document.getElementById("log");
const chatspace = document.getElementById("chatspace");

const prompt_input = document.getElementById("prompt_input");
const sendBtn      = document.getElementById("send");
const clearBtn     = document.getElementById("clearChatBtn");
const tohomeBtn    = document.getElementById("tohome");

var chats = localStorage.getItem("miniLM/chats");



function checkChats(){

  if (!chats){
    log.hidden       = false;
    chatspace.hidden = true;
  }
  else {
    log.hidden       = true;
    chatspace.hidden = false;
    renderChats();
    showUserPrompt();
  }
}
checkChats();

function currentChats(){
  return localStorage.getItem("miniLM/currentChats");
}

function setCurrentChats(){
  
  const msgEl   = document.getElementById("msg");
  const content = `${msgEl.innerHTML}`;
  
  if (content !== "null"){
    localStorage.setItem("miniLM/currentChats", content);
  }else{
    localStorage.setItem("miniLM/currentChats", "");
  }
}

function constructChatSpace(){

  log.hidden          = true;
  chatspace.hidden    = false;
  
  chatspace.innerHTML = `
    <div class='msg' id='msg'>${currentChats()}</div>
  `;
}

function clearChats(){
  chats = null;
  localStorage.clear();
  checkChats();
}

clearBtn.addEventListener("click", clearChats);

function renderChats(){

  const hist    = JSON.parse(chats);
  const noSpace = (document.getElementById("msg") == null);
  console.log(`\nnoSpace:${noSpace}\n`);

  if (noSpace){
    constructChatSpace();
  } 
  
  const msgEl   = document.getElementById("msg");
  const content = `${msgEl.innerHTML}`;

  for (let i=0;i<hist.length;i++){
    
    if (content !== "null"){
      msgEl.innerHTML += (`<p id="user" class="user">${hist[i].user}</p>`);
      msgEl.innerHTML += (`<p id="bot" class="bot">${hist[i].bot}</p>`);
    }else{
      msgEl.innerHTML = (`<p id="user" class="user">${hist[i].user}</p>`);
      msgEl.innerHTML += (`<p id="bot" class="bot">${hist[i].bot}</p>`);
    }

    chats = msgEl.innerHTML;
    setCurrentChats();
  }
}

function showUserPrompt(){
  
  const msgEl   = document.getElementById("msg");
  const prompt  = localStorage.getItem("miniLM/pending");
  const content = `${msgEl.innerHTML}`;

  if (prompt){
    if (content !== "null"){
      msgEl.innerHTML += (`<p id="user" class="user">${prompt}</p>`);
    }
    else{
      msgEl.innerHTML = (`<p id="user" class="user">${prompt}</p>`);
    }
      chats = msgEl.innerHTML;
    setCurrentChats();
    getResponse(prompt);
  }
}

export function showBotResponse(response){
  
  const msgEl   = document.getElementById("msg");
  const content = `${msgEl.innerHTML}`;

  if (response){
  if (content !== "null"){
      msgEl.innerHTML += (`<p id="bot" class="bot">${response}</p>`);
    }
    else{
      msgEl.innerHTML = (`<p id="bot" class="bot">${prompt}</p>`);
    }
      chats = msgEl.innerHTML;
    setCurrentChats();
    
    const prompt = localStorage.getItem("miniLM/pending");
    const hist   = JSON.parse(localStorage.getItem("miniLM/chats"));
    const ndata  = {user: prompt, bot:response};
    
    if (hist){
      hist.push(ndata);
      localStorage.setItem("miniLM/chats", JSON.stringify(hist));
    }
    else{
      localStorage.setItem("miniLM/chats", JSON.stringify([ndata]));  
    }
    
    localStorage.removeItem("miniLM/pending");
  }
}

sendBtn.addEventListener("click", ()=>{
  const prompt = prompt_input.value.trim();
  
  if (prompt.length > 1){

    localStorage.setItem("miniLM/pending", prompt);

    if (!chats){
      constructChatSpace();
    }
    showUserPrompt();
    //getResponse(prompt); will be called on showUserPrompt()
    prompt_input.value = "";
  }
});

tohomeBtn.addEventListener("click", () =>{
  console.log("running tohomeBtn fucntion");
  routeTo("/");
});

const chip1 = document.getElementById("chip1");
const chip2 = document.getElementById("chip2");
const chip3 = document.getElementById("chip3");


chip1.addEventListener("click", ()=>{
  const prompt = chip1.textContent;
  prompt_input.value = prompt;
});
chip2.addEventListener("click", ()=>{
  const prompt = chip2.textContent;
  prompt_input.value = prompt;
})
;chip3.addEventListener("click", ()=>{
  const prompt = chip3.textContent;
  prompt_input.value = prompt;
});

