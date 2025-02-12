package com.portfolio.beportfolio.projects.mapperlayer;

import com.portfolio.beportfolio.projects.dataaccesslayer.Project;
import com.portfolio.beportfolio.projects.dataaccesslayer.ProjectIdentifier;
import com.portfolio.beportfolio.projects.presentationlayer.ProjectRequestModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ProjectRequestMapper {
    @Mappings({
            @Mapping(target = "projectId", ignore = true),
    })
    Project requestModelToEntity(ProjectRequestModel projectRequestModel, ProjectIdentifier projectIdentifier);
}
