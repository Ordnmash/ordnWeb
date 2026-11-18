const URL = window.location.hostname === "localhost"
    ? "http://127.0.0.1:8080"
    : window.location.origin;

const projectForm = document.getElementById("projectForm");

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