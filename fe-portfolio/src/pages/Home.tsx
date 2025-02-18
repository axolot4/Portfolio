import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Load skills from localStorage or default to ["C#", "Java", "SQL"]
  const [skills, setSkills] = useState<string[]>(() => {
    const storedSkills = localStorage.getItem("skills");
    return storedSkills ? JSON.parse(storedSkills) : ["C#", "Java", "SQL"];
  });
  const [newSkill, setNewSkill] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<string | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [newProject, setNewProject] = useState({
    projectName: "",
    projectDescriptionEn: "",
    projectDescriptionFr: "",
    projectImages: ""
  });
  const navigate = useNavigate();
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<{
    projectId: string;
    projectName: string;
    projectDescriptionEn: string;
    projectDescriptionFr: string;
    projectImages: string[];
  } | null>(null);

  const [projects, setProjects] = useState<{ projectId: string; projectName: string; projectDescriptionEn: string; projectDescriptionFr: string; projectImages: string[] }[]>([]);

  const openEditProjectModal = (project: {
    projectId: string;
    projectName: string;
    projectDescriptionEn: string;
    projectDescriptionFr: string;
    projectImages: string[];
  }) => {
    setProjectToEdit(project);
    setIsEditProjectModalOpen(true);
  };

  const [comments, setComments] = useState<{
    commentId: string;
    user: string;
    commentContent: string;
    approved: boolean;
  }[]>([]);

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [newComment, setNewComment] = useState({
    user: "",
    commentContent: "",
  });

  const [pendingComments, setPendingComments] = useState<{
    commentId: string;
    user: string;
    commentContent: string;
    approved: boolean;
  }[]>([]);

  useEffect(() => {
    localStorage.setItem("skills", JSON.stringify(skills));
  }, [skills]);

  const addSkill = () => {
    if (newSkill.trim() !== "" && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill(""); // Clear input after adding
    }
  };

  // Delete a skill
  const confirmDeleteSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };


  useEffect(() => {
    // Fetch Projects
    fetch("https://portfolio-xgod.onrender.com/api/v1/projects")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));

    // Fetch Approved Comments
    fetch("https://portfolio-xgod.onrender.com/api/v1/comments")
      .then((response) => response.json())
      .then((data) => {
        const formattedComments = data
          .filter((comment: { approved: boolean }) => comment.approved) // Ensure field name matches the DB
          .map((comment: { commentId: string; user: string; commentContent: string; approved: boolean }) => ({
            commentId: comment.commentId,
            user: comment.user,
            commentContent: comment.commentContent,
            approved: comment.approved,
          }));
        setComments(formattedComments);
      })
      .catch((error) => console.error("Error fetching comments:", error));

    // Fetch Pending Comments
    if (isLoggedIn) {
      fetch("https://portfolio-xgod.onrender.com/api/v1/comments/pending")
        .then((response) => response.json())
        .then((data) => {
          const formattedPendingComments = data.map(
            (comment: { commentId: string; user: string; commentContent: string; approved: boolean }) => ({
              commentId: comment.commentId,
              user: comment.user,
              commentContent: comment.commentContent,
              approved: comment.approved, // Ensure property exists
            })
          );
          setPendingComments(formattedPendingComments);
        })
        .catch((error) => console.error("Error fetching pending comments:", error));
    }
  }, [isLoggedIn]);

  const addProject = () => {
    fetch("https://portfolio-xgod.onrender.com/api/v1/projects", {
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

    fetch(`https://portfolio-xgod.onrender.com/api/v1/projects/${projectToDelete}`, {
      method: "DELETE"
    })
      .then(() => {
        setProjects(projects.filter((proj) => proj.projectId !== projectToDelete));
        setIsDeleteProjectModalOpen(false);
      })
      .catch((error) => console.error("Error deleting project:", error));
  };

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
      setIsModalOpen(false);
    } else {
      alert("Invalid credentials");
    }
  };

  const deleteSkill = () => {
    if (skillToDelete) {
      setSkills(skills.filter(skill => skill !== skillToDelete));
      setIsDeleteModalOpen(false);
      setSkillToDelete(null);
    }
  };

  const editProject = () => {
    if (!projectToEdit) return;

    fetch(`https://portfolio-xgod.onrender.com/api/v1/projects/${projectToEdit.projectId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...projectToEdit,
        projectImages: Array.isArray(projectToEdit.projectImages)
          ? projectToEdit.projectImages // Keep it as an array
          : String(projectToEdit.projectImages) // Ensure it's a string before calling .split(",")
            .split(",")
            .map((img) => img.trim()),
      }),
    })
      .then((response) => response.json())
      .then((updatedProject) => {
        setProjects(
          projects.map((proj) =>
            proj.projectId === updatedProject.projectId ? updatedProject : proj
          )
        );
        setIsEditProjectModalOpen(false);
      })
      .catch((error) => console.error("Error updating project:", error));
  };

  const addComment = () => {
    fetch("https://portfolio-xgod.onrender.com/api/v1/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newComment, approved: false }), // Ensure it's unapproved
    })
      .then((response) => response.json())
      .then((addedComment) => {
        setPendingComments([...pendingComments, addedComment]); // Add to pending
        setIsCommentModalOpen(false); // Close modal
        setNewComment({ user: "", commentContent: "" }); // Reset form
      })
      .catch((error) => console.error("Error adding comment:", error));
  };



  const approveComment = (commentId: string) => {
    fetch(`https://portfolio-xgod.onrender.com/api/v1/comments/approve/${commentId}`, {
      method: "PUT",
    })
      .then(() => {
        // Find the comment in pending list
        const approvedComment = pendingComments.find(comment => comment.commentId === commentId);
        if (approvedComment) {
          // Remove from pending and add to approved list
          setPendingComments(pendingComments.filter(comment => comment.commentId !== commentId));
          setComments([...comments, { ...approvedComment, approved: true }]); // Type-safe
        }
      })
      .catch((error) => console.error("Error approving comment:", error));
  };


  const deleteComment = async (commentId: string) => {
    try {
      const response = await fetch(`https://portfolio-xgod.onrender.com/api/v1/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      // Remove the comment from both lists
      setPendingComments(pendingComments.filter(comment => comment.commentId !== commentId));
      setComments(comments.filter(comment => comment.commentId !== commentId));

      console.log(`Comment ${commentId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment. Please try again.");
    }
  };



  return (
    <div className="container">
      {/* Language Switch */}
      <div className="language-buttons">
        <button onClick={() => i18n.changeLanguage("en")}>English</button>
        <button onClick={() => i18n.changeLanguage("fr")}>Français</button>
      </div>

      {/* Admin Login Button */}
      <button className="admin-login-btn" onClick={() => setIsModalOpen(true)}>
        {t("login.admin_login")}
      </button>

      {/* Admin Login Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{t("login.admin_login")}</h2>
            <input
              type="text"
              placeholder={t("login.username")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder={t("login.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>{t("login.login_button")}</button>
            <button className="close" onClick={() => setIsModalOpen(false)}>{t("buttons.cancel")}</button>
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
          <img src="/measf.jpg" alt="Your Name" className="profile-pic" />
          <h1>{t("homepage.welcome_message")}</h1>
          <p>{t("homepage.subtitle")}</p>
          <div className="cv-section">
            <p>Download My CV</p>
            <div className="cv-buttons">
              <a href="/assets/Resume.pdf" download className="download-btn">ENG</a>
              <a href="/assets/Resume French.pdf" download className="download-btn">FR</a>
            </div>
          </div>
        </div>
      </header>

      {/* Contact Section */}
      <section className="contact">
        <h2>{t("contact.title")}</h2>
        <p>📧 {t("contact.email")}: <a href="mailto:ricardolfalcao.2005@gmail.com">ricardolfalcao.2005@gmail.com</a></p>
        <p>💼 {t("contact.linkedin")}: <a href="https://linkedin.com/in/ricardo-falcao-7022862b1" target="_blank">My Linkedin</a></p>
        <p>🐙{t("contact.github")}: <a href="https://github.com/axolot4" target="_blank">My GitHub</a></p>
      </section>

      {/* Skills Section */}
      <section className="skills">
        <h2>{t("skills.title")}</h2>

        <ul>
          {skills.map((skill, index) => (
            <li key={index}>
              {skill}
              {/* Show delete button only if admin (isLoggedIn) */}
              {isLoggedIn && <button className="delete-skill-btn" onClick={() => confirmDeleteSkill(skill)}>🗑</button>}
            </li>
          ))}
        </ul>

        {/* Show add skill input only if admin (isLoggedIn) */}
        {isLoggedIn && (
          <div className="add-skills">
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


      {/* Add Project Modal */}
      {isProjectModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Project</h2>
            <input
              type="text"
              placeholder="Project Name"
              value={newProject.projectName}
              onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Project Description (English)"
              value={newProject.projectDescriptionEn}
              onChange={(e) => setNewProject({ ...newProject, projectDescriptionEn: e.target.value })}
            />
            <input
              type="text"
              placeholder="Project Description (French)"
              value={newProject.projectDescriptionFr}
              onChange={(e) => setNewProject({ ...newProject, projectDescriptionFr: e.target.value })}
            />
            <input
              type="text"
              placeholder="Project Images (comma-separated)"
              value={newProject.projectImages}
              onChange={(e) => setNewProject({ ...newProject, projectImages: e.target.value })}
            />
            <button onClick={addProject}>Add Project</button>
            <button className="close" onClick={() => setIsProjectModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {isEditProjectModalOpen && projectToEdit && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Project</h2>
            <input
              type="text"
              placeholder="Project Name"
              value={projectToEdit.projectName}
              onChange={(e) => setProjectToEdit({ ...projectToEdit, projectName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Project Description (English)"
              value={projectToEdit.projectDescriptionEn}
              onChange={(e) => setProjectToEdit({ ...projectToEdit, projectDescriptionEn: e.target.value })}
            />
            <input
              type="text"
              placeholder="Project Description (French)"
              value={projectToEdit.projectDescriptionFr}
              onChange={(e) => setProjectToEdit({ ...projectToEdit, projectDescriptionFr: e.target.value })}
            />
            <input
              type="text"
              placeholder="Project Images (comma-separated)"
              value={Array.isArray(projectToEdit.projectImages) ? projectToEdit.projectImages.join(", ") : ""}
              onChange={(e) =>
                setProjectToEdit({
                  ...projectToEdit,
                  projectImages: e.target.value ? e.target.value.split(",").map((img) => img.trim()) : [],
                })
              }
            />
            <button onClick={editProject}>Update Project</button>
            <button className="close" onClick={() => setIsEditProjectModalOpen(false)}>Cancel</button>
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

      {isCommentModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Post a Comment</h2>
            <input
              type="text"
              placeholder="Your Name"
              value={newComment.user}
              onChange={(e) => setNewComment({ ...newComment, user: e.target.value })}
            />
            <textarea
              placeholder="Your Comment"
              value={newComment.commentContent}
              onChange={(e) => setNewComment({ ...newComment, commentContent: e.target.value })}
            />
            <button onClick={addComment}>Submit</button>
            <button className="close" onClick={() => setIsCommentModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Projects Section */}
      <section className="projects">
        <h2>Projects</h2>
        <div className="projects-container">
          {projects.map((project) => (
            <div
              key={project.projectId}
              className="project-card"
              onClick={() => navigate(`/projects/${project.projectId}`)} // Navigate to project details
              style={{ cursor: "pointer" }}
            >
              <img src={project.projectImages[0]} alt={project.projectName} className="project-image" />
              <h3>{project.projectName}</h3>

              {isLoggedIn && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent navigation from triggering
                      openEditProjectModal(project);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent navigation from triggering
                      setProjectToDelete(project.projectId);
                      setIsDeleteProjectModalOpen(true);
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>

          ))}
        </div>
        {/* Add Project Button */}
        {isLoggedIn && <button onClick={() => setIsProjectModalOpen(true)}>Add Project</button>}
      </section>

      {/* Comments Section - Positioned on the Left */}
      {isLoggedIn && (
        <section className="admin-comments">
          <h2>Pending Comments</h2>
          <div className="pending-comments-list">
            {pendingComments.map((comment) => (
              <div key={comment.commentId} className="pending-comment-card">
                <p className="comment-user">{comment.user}</p>
                <p className="comment-content">{comment.commentContent}</p>
                <button className="approve-btn" onClick={() => approveComment(comment.commentId)}>Approve</button>
                <button className="delete-btn" onClick={() => deleteComment(comment.commentId)}>Delete</button>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="comments-section">
        <h2>{t("comments.title")}</h2>
        <button className="post-comment-btn" onClick={() => setIsCommentModalOpen(true)}>
          {t("comments.add_comment")}
        </button>
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.commentId} className="comment-card">
              <p className="comment-user">{comment.user}</p>
              <p className="comment-content">{comment.commentContent}</p>

              {/* Show delete button only for logged-in admins */}
              {isLoggedIn && (
                <button className="delete-btn" onClick={() => deleteComment(comment.commentId)}>
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; {new Date().getFullYear()} {t("footer.copyright")}</p>
      </footer>
    </div>
  );
};

export default Home;
