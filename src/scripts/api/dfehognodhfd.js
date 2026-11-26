const URL = window.location.hostname === "localhost"
    ? "http://127.0.0.1:8080"
    : window.location.origin;

const projectForm = document.getElementById("projectForm");

import { displayProjects } from "../dhddhdal.js";

projectForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(projectForm);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`${URL}/user/projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert("Project added successfully!");
            projectForm.reset();
        }
    } catch (error) {
        console.error("Error adding project:", error);
        alert("An error occurred while adding the project.");
    }
});

async function getProjects(){
  try{
    const urlRes = await fetch(`${URL}/user/projects`);
    if (urlRes.ok){
      const data = await urlRes.json();
      displayProjects(data);
    }
  }
  catch(err){
    console.log(err);
  }
}

getProjects(); // by default we pull existing projects from db.