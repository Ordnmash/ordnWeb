const projectList = document.getElementById("projectList");

export function displayProjects(projects){
  projectList.innerHTML = "";
  let i = 0;
  projects.forEach((project) => {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");
    projectItem.innerHTML = `
      <h3 id="projectTitle${i}">${project.title}</h3>
      <p id="projectContent${i}">${project.content}</p>
      <img src="${project.img}" alt="${project.title}">
      <p id="projectLink${i}">${project.link}</p>
      <p id="projectLinkname${i}">${project.nameLink}</p>
      <button id="deleteProject${i}" class="delete-project">Delete</button>
    `;
    projectList.appendChild(projectItem);
    i++;
  });
}
