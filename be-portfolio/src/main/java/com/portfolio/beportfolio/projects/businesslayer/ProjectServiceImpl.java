package com.portfolio.beportfolio.projects.businesslayer;

import com.portfolio.beportfolio.projects.dataaccesslayer.Project;
import com.portfolio.beportfolio.projects.dataaccesslayer.ProjectIdentifier;
import com.portfolio.beportfolio.projects.dataaccesslayer.ProjectRepository;
import com.portfolio.beportfolio.projects.mapperlayer.ProjectRequestMapper;
import com.portfolio.beportfolio.projects.mapperlayer.ProjectResponseMapper;
import com.portfolio.beportfolio.projects.presentationlayer.ProjectRequestModel;
import com.portfolio.beportfolio.projects.presentationlayer.ProjectResponseModel;
import com.portfolio.beportfolio.utils.exceptions.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    public ProjectRepository projectRepository;
    private final ProjectResponseMapper projectResponseMapper;
    private final ProjectRequestMapper projectRequestMapper;

    public ProjectServiceImpl(ProjectRepository projectRepository, ProjectResponseMapper projectResponseMapper, ProjectRequestMapper projectRequestMapper) {
        this.projectRepository = projectRepository;
        this.projectResponseMapper = projectResponseMapper;
        this.projectRequestMapper = projectRequestMapper;
    }

    @Override
    public List<ProjectResponseModel> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        return projectResponseMapper.entityListToResponseModelList(projects);
    }

    @Override
    public ProjectResponseModel getProjectByProjectId(String projectId) {
        Project project = projectRepository.findProjectByProjectId(projectId);
        return projectResponseMapper.entityToResponseModel(project);
    }

    @Override
    public ProjectResponseModel addProject(ProjectRequestModel projectRequestModel) {
        Project project = projectRequestMapper.requestModelToEntity(projectRequestModel, new ProjectIdentifier());
        Project savedProject = projectRepository.save(project);
        return projectResponseMapper.entityToResponseModel(savedProject);
    }

    @Override
    public ProjectResponseModel updateProject(String projectId, ProjectRequestModel projectRequestModel) {
        Project existingProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException("Project with ID " + projectId + " not found"));
        if (projectRequestModel.getProjectName() != null) {
            existingProject.setProjectName(projectRequestModel.getProjectName());
        }
        if (projectRequestModel.getProjectDescriptionEn() != null) {
            existingProject.setProjectDescriptionEn(projectRequestModel.getProjectDescriptionEn());
        }
        if (projectRequestModel.getProjectDescriptionFr() != null) {
            existingProject.setProjectDescriptionFr(projectRequestModel.getProjectDescriptionFr());
        }
        if (projectRequestModel.getProjectImages() != null) {
            existingProject.setProjectImages(projectRequestModel.getProjectImages());
        }
        Project updatedProject = projectRepository.save(existingProject);
        return projectResponseMapper.entityToResponseModel(updatedProject);
    }

    @Override
    public void deleteProjectByProjectId(String projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException("Project with ID " + projectId + " not found"));
        projectRepository.delete(project);
    }
}
