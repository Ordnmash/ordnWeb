const summarybtn      = document.getElementById("summary-btn");
const projectsbtn     = document.getElementById("projects-btn");
const detailsbtn      = document.getElementById("details-btn");
const topmenubtn      = document.getElementById("topmenu");
const commentbtn      = document.getElementById("comment_");
const closeCommentbtn = document.getElementById("closeComment-btn");
const sendCommentbtn  = document.getElementById("sendComment-btn");

const summarySection  = document.getElementById("summary-section");
const projectsSection = document.getElementById("projects-section");
const detailsSection  = document.getElementById("details-section");
const outint          = document.getElementById("outint");
const inint           = document.getElementById("inint");
const commentInput    = document.getElementById("comment_to");
const topmenushow     = document.getElementById("right-tv");
const topmenublank    = document.getElementById("topmenu-blank");
const tvnames         = document.getElementById("tv-names");
const righttv         = document.getElementById("right-tv");

const red             = document.getElementById("red");
const yellow          = document.getElementById("yellow");
const green           = document.getElementById("green");

topmenubtn.addEventListener("click", function(){
  topmenushow.classList.add("active");
  tvnames.classList.add("notactive");
  topmenublank.classList.add("active");
  topmenubtn.classList.remove("active");
  righttv.classList.add("active");
});

topmenublank.addEventListener("click", function(){
  topmenushow.classList.remove("active");
  tvnames.classList.remove("notactive");
  topmenublank.classList.remove("active");
  topmenubtn.classList.add("active");
  righttv.classList.remove("active");
});

let mycode = null; // avoid undefined errors

commentbtn.addEventListener("click", function(){
  outint.classList.remove("active");
  inint.classList.add("active");

  let mycode = setInterval(() => {
    if (commentInput.value.length > 0){
      if (commentInput.value !== ' '){
        closeCommentbtn.classList.remove("active");
        sendCommentbtn.classList.add("active");
      }
    } else {
      closeCommentbtn.classList.add("active");
      sendCommentbtn.classList.remove("active");
    };
  }, 1);
});


closeCommentbtn.addEventListener("click", function(){
  outint.classList.add("active");
  inint.classList.remove("active");
  clearInterval(mycode);
});

summarybtn.addEventListener("click", function(){
  summarybtn.classList.add("active");
  projectsbtn.classList.remove("active");
  detailsbtn.classList.remove("active");
  
  // screen display control
  summarySection.classList.add("active");
  projectsSection.classList.remove("active");
  detailsSection.classList.remove("active");
  tvnames.classList.remove("notactive");
  topmenublank.classList.remove("active");
  topmenubtn.classList.add("active");
  righttv.classList.remove("active")
});

projectsbtn.addEventListener("click", function(){
  projectsbtn.classList.add("active");
  summarybtn.classList.remove("active");
  detailsbtn.classList.remove("active");
  
  // screen display control
  projectsSection.classList.add("active");
  summarySection.classList.remove("active");
  detailsSection.classList.remove("active");
  topmenublank.classList.remove("active");
  tvnames.classList.remove("notactive");
  topmenublank.classList.remove("active");
  topmenubtn.classList.add("active");
  righttv.classList.remove("active");
});

detailsbtn.addEventListener("click", function(){
  detailsbtn.classList.add("active");
  summarybtn.classList.remove("active");
  projectsbtn.classList.remove("active");
  
  // screen display control
  detailsSection.classList.add("active");
  projectsSection.classList.remove("active");
  summarySection.classList.remove("active");
  topmenublank.classList.remove("active");
  tvnames.classList.remove("notactive");
  topmenublank.classList.remove("active");
  topmenubtn.classList.add("active");
  righttv.classList.remove("active");
});

import { getDetails } from "./api/cmmnctn.js";


function elementIdentity(identity){
  
  let htmlDetails = "";
  const keys = Object.keys(identity);
  for (let det=0; det<keys.length; det++){
    htmlDetails += `<h3>${keys[det]}:</h3><p>${identity[keys[det]]}</p>`;
  }
  
  htmlDetails += `<h3>current age:</h3><p id="current-age"></p>`;
  return htmlDetails;
}

async function displayDetails(){

  const details_section = document.getElementById("details_section");
  const details = await getDetails();

  // pass them to actual html file
  details_section.innerHTML   = elementIdentity(details.user);
  
  // display top view names
  const tv_names              = document.getElementById("tv-names");
  tv_names.innerText          = details.detailedUser.firstname + ' ' + details.detailedUser.lastname;
  
  // display bio
  const bio_section           = document.getElementById("bio_section");
  bio_section.innerText       = details.account.bio;

  // display head
  const head_section          = document.getElementById("head_section");
  head_section.textContent    = details.account.top_status; 

  // display details at details
  const details_              = document.getElementById("details_");
  details_.textContent        = details.account.details;
  
  ageUpdate();
}

displayDetails();


// running age update function 
function ageUpdate(){

  const current_age = document.getElementById("current-age");
  const birthDate   = new Date("2007-06-13T00:02:00Z");

  const now = new Date();
  const ageMilliseconds     = now - birthDate;
  const ageMillisecondsYear = 1000 * 60 * 60 * 24 * 365.2421904020;
  const ageInYears = ageMilliseconds / ageMillisecondsYear;
  
  current_age.textContent = `${ageInYears.toFixed(12)}`;
  requestAnimationFrame(ageUpdate);
};

const goChatBtn = document.getElementById("goChat");

goChatBtn.addEventListener("click", () =>{
  window.location.href = "/chat";
});