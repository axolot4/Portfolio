import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProjectDetails.css";

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams(); // Get projectId from URL
  const navigate = useNavigate();
  const [project, setProject] = useState<{
    projectId: string;
    projectName: string;
    projectDescriptionEn: string;
    projectDescriptionFr: string;
    projectImages: string[];
  } | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/projects/${projectId}`)
      .then((response) => response.json())
      .then((data) => setProject(data))
      .catch((error) => console.error("Error fetching project details:", error));
  }, [projectId]);

  if (!project) {
    return <h2>Loading project details...</h2>;
  }

  return (
    <div className="project-details-container">
      <button className="back-btn" onClick={() => navigate("/")}>← Back to Projects</button>

      <h1>{project.projectName}</h1>

      {/* English Description */}
      <h2>🇬🇧 English</h2>
      <p>
        {project.projectDescriptionEn.split("<br />").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>

      {/* French Description */}
      <h2>🇫🇷 Français</h2>
      <p>
        {project.projectDescriptionFr.split("<br />").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>

      {/* Main Image */}
      <img src={project.projectImages[0]} alt={project.projectName} className="main-image" />

      {/* Additional Images */}
      <div className="additional-images">
        {project.projectImages.slice(1).map((img, index) => (
          <img key={index} src={img} alt={`Project ${index}`} className="thumbnail" />
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;
