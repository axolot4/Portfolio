package com.portfolio.beportfolio.projects.businesslayer;

import com.portfolio.beportfolio.projects.presentationlayer.ProjectRequestModel;
import com.portfolio.beportfolio.projects.presentationlayer.ProjectResponseModel;

import java.util.List;

public interface ProjectService {
    List<ProjectResponseModel> getAllProjects();
    ProjectResponseModel getProjectByProjectId(String projectId);
    ProjectResponseModel addProject(ProjectRequestModel projectRequestModel);
    ProjectResponseModel updateProject(String projectId, ProjectRequestModel projectRequestModel);
    void deleteProjectByProjectId(String projectId);
}
