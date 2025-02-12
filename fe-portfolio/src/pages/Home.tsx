import React, { useState, useEffect } from "react";
import "./Home.css";

const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState<string[]>(["C#", "Java", "SQL"]);
  const [newSkill, setNewSkill] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<string | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<any>(null);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [newProject, setNewProject] = useState({
    projectName: "",
    projectDescription: "",
    projectImages: ""
  });

  const [projects, setProjects] = useState<{ projectId: string; projectName: string; projectImages: string[] }[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const addProject = () => {
    fetch("http://localhost:8080/api/v1/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newProject,
        projectImages: newProject.projectImages.split(",").map((img: String) => img.trim())
      })
    })
      .then((response) => response.json())
      .then((addedProject) => {
        setProjects([...projects, addedProject]);
        setIsProjectModalOpen(false);
      })
      .catch((error) => console.error("Error adding project:", error));
  };

  const deleteProject = () => {
    if (!projectToDelete) return;

    fetch(`http://localhost:8080/api/v1/projects/${projectToDelete}`, {
      method: "DELETE"
    })
      .then(() => {
        setProjects(projects.filter((proj) => proj.projectId !== projectToDelete));
        setIsDeleteProjectModalOpen(false);
      })
      .catch((error) => console.error("Error deleting project:", error));
  };

  const editProject = () => {
    fetch(`http://localhost:8080/api/v1/projects/${projectToEdit.projectId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...projectToEdit,
        projectImages: projectToEdit.projectImages.split(",").map((img: String) => img.trim())
      })
    })
      .then(() => {
        setProjects(
          projects.map((proj) =>
            proj.projectId === projectToEdit.projectId ? { ...projectToEdit } : proj
          )
        );
        setIsEditProjectModalOpen(false);
      })
      .catch((error) => console.error("Error updating project:", error));
  };

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
      setIsModalOpen(false);
    } else {
      alert("Invalid credentials");
    }
  };

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const confirmDeleteSkill = (skill: string) => {
    setSkillToDelete(skill);
    setIsDeleteModalOpen(true);
  };

  const deleteSkill = () => {
    if (skillToDelete) {
      setSkills(skills.filter(skill => skill !== skillToDelete));
      setIsDeleteModalOpen(false);
      setSkillToDelete(null);
    }
  };

  return (
    <div className="container">
      {/* Admin Login Button */}
      <button className="admin-login-btn" onClick={() => setIsModalOpen(true)}>Admin Login</button>

      {/* Admin Login Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Admin Login</h2>
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <button className="close" onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal-overlay" onClick={() => setIsDeleteModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete "{skillToDelete}"?</p>
            <button className="delete-btn" onClick={deleteSkill}>Yes, Delete</button>
            <button className="cancel-btn" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Header Section */}
      <header className="hero">
        <div className="hero-content">
          <img src="/profile.jpg" alt="Your Name" className="profile-pic" />
          <h1>Hello, I'm <span className="highlight">Ricardo Lau Falcao</span></h1>
          <p>Software Developer | C# | Java | SQL</p>
          <div className="cv-section">
            <p>Download My CV</p>
            <div className="cv-buttons">
              <a href="/assets/Resume.pdf" download className="download-btn">ENG</a>
              <a href="/assets/Resume French.pdf" download className="download-btn">FR</a>
            </div>
          </div>
        </div>
      </header>

      {/* Skills Section */}
      <section className="skills">
        <h2>Skills</h2>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill} {isLoggedIn && <button className="delete-skill-btn" onClick={() => confirmDeleteSkill(skill)}>🗑</button>}</li>
          ))}
        </ul>
        {isLoggedIn && (
          <div className="edit-skills">
            <input 
              type="text" 
              placeholder="Add new skill" 
              value={newSkill} 
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <button onClick={addSkill}>Add Skill</button>
          </div>
        )}
      </section>

      {/* Add Project Button */}
      {isLoggedIn && <button onClick={() => setIsProjectModalOpen(true)}>Add Project</button>}
      
      {/* Add/Edit Project Modal */}
      {(isProjectModalOpen || isEditProjectModalOpen) && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isEditProjectModalOpen ? "Edit Project" : "Add Project"}</h2>
            <input
              type="text"
              placeholder="Project Name"
              value={isEditProjectModalOpen ? projectToEdit.projectName : newProject.projectName}
              onChange={(e) =>
                isEditProjectModalOpen
                  ? setProjectToEdit({ ...projectToEdit, projectName: e.target.value })
                  : setNewProject({ ...newProject, projectName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Project Description"
              value={
                isEditProjectModalOpen ? projectToEdit.projectDescription : newProject.projectDescription
              }
              onChange={(e) =>
                isEditProjectModalOpen
                  ? setProjectToEdit({ ...projectToEdit, projectDescription: e.target.value })
                  : setNewProject({ ...newProject, projectDescription: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Project Images (comma-separated)"
              value={
                isEditProjectModalOpen ? projectToEdit.projectImages.join(", ") : newProject.projectImages
              }
              onChange={(e) =>
                isEditProjectModalOpen
                  ? setProjectToEdit({ ...projectToEdit, projectImages: e.target.value.split(",") })
                  : setNewProject({ ...newProject, projectImages: e.target.value })
              }
            />
            <button onClick={isEditProjectModalOpen ? editProject : addProject}>
              {isEditProjectModalOpen ? "Update Project" : "Add Project"}
            </button>
            <button className="close" onClick={() => (isEditProjectModalOpen ? setIsEditProjectModalOpen(false) : setIsProjectModalOpen(false))}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete Project Modal */}
      {isDeleteProjectModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this project?</p>
            <button className="delete-btn" onClick={deleteProject}>
              Yes, Delete
            </button>
            <button className="cancel-btn" onClick={() => setIsDeleteProjectModalOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* Projects Section */}
      <section className="projects">
        <h2>Projects</h2>
        <div className="projects-container">
          {projects.map((project) => (
            <div key={project.projectId} className="project-card">
              <img src={project.projectImages[0]} alt={project.projectName} className="project-image" />
              <h3>{project.projectName}</h3>
              {isLoggedIn && (
                <>
                  <button onClick={() => {
                    setProjectToEdit(project);
                    setIsEditProjectModalOpen(true);
                  }}>
                    Edit
                  </button>
                  <button onClick={() => {
                    setProjectToDelete(project.projectId);
                    setIsDeleteProjectModalOpen(true);
                  }}>
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <h2>Contact Me</h2>
        <p>📧 Email: <a href="mailto:ricardolfalcao.2005@gmail.com">ricardolfalcao.2005@gmail.com</a></p>
        <p>💼 LinkedIn: <a href="www.linkedin.com/in/ricardo-falcao-7022862b1" target="_blank">My Linkedin</a></p>
        <p>🐙 GitHub: <a href="https://github.com/axolot4" target="_blank">My GitHub</a></p>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; {new Date().getFullYear()} Ricardo. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
