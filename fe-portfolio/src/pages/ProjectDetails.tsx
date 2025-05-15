import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProjectDetails.css";

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<{
    projectId: string;
    projectName: string;
    projectDescriptionEn: string;
    projectDescriptionFr: string;
    projectImages: string[];
  } | null>(null);
  const [language, setLanguage] = useState<"en" | "fr">("en"); // State for language toggle

  useEffect(() => {
    fetch(`https://portfolio-xgod.onrender.com/api/v1/projects/${projectId}`)
      .then((response) => response.json())
      .then((data) => setProject(data))
      .catch((error) =>
        console.error("Error fetching project details:", error)
      );
  }, [projectId]);

  if (!project) {
    return <h2>Loading project details...</h2>;
  }

  return (
    <div className="project-details-container">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back
      </button>

      <h1>{project.projectName}</h1>

      {/* Language Toggle Buttons */}
      <div className="language-toggle">
        <button
          className={language === "en" ? "active" : ""}
          onClick={() => setLanguage("en")}
        >
          English
        </button>
        <button
          className={language === "fr" ? "active" : ""}
          onClick={() => setLanguage("fr")}
        >
          Français
        </button>
      </div>

      <div className="project-content">
        {/* Left Column: Image Section */}
        <div className="image-section">
          <img
            src={project.projectImages[0]}
            alt={project.projectName}
            className="main-image"
          />
          <div className="additional-images">
            {project.projectImages.slice(1).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Project ${index}`}
                className="thumbnail"
              />
            ))}
          </div>
        </div>

        {/* Right Column: Description Section */}
        <div className="description-section">
          <p>
            {(language === "en"
              ? project.projectDescriptionEn
              : project.projectDescriptionFr
            )
              .split("<br />")
              .map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
