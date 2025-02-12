package com.portfolio.beportfolio.projects.mapperlayer;

import com.portfolio.beportfolio.projects.dataaccesslayer.Project;
import com.portfolio.beportfolio.projects.presentationlayer.ProjectResponseModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProjectResponseMapper {
    @Mapping(source = "projectId", target = "projectId")
    ProjectResponseModel entityToResponseModel(Project project);

    List<ProjectResponseModel> entityListToResponseModelList(List<Project> projectList);
}
