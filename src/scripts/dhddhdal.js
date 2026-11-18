const projectList = document.getElementById("projectList");

function displayProjects(projects){
  projectList.innerHTML = "";
  projects.forEach((project) => {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");
    projectItem.innerHTML = `
      <h3 id="projectTitle">${project.title}</h3>
      <p id="projectContent">${project.content}</p>
      <img src="${project.img}" alt="${project.title}">
    `;
    projectList.appendChild(projectItem);
  });
}