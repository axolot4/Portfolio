package com.portfolio.beportfolio.skills.mapperlayer;

import com.portfolio.beportfolio.projects.dataaccesslayer.Project;
import com.portfolio.beportfolio.projects.dataaccesslayer.ProjectIdentifier;
import com.portfolio.beportfolio.projects.presentationlayer.ProjectRequestModel;
import com.portfolio.beportfolio.skills.dataaccesslayer.Skill;
import com.portfolio.beportfolio.skills.dataaccesslayer.SkillIdentifier;
import com.portfolio.beportfolio.skills.presentationlayer.SkillRequestModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface SkillRequestMapper {
    @Mappings({
            @Mapping(target = "skillId", ignore = true),
    })
    Skill requestModelToEntity(SkillRequestModel skillRequestModel, SkillIdentifier skillIdentifier);
}
