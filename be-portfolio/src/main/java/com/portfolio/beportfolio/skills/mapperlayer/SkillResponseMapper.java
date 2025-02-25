package com.portfolio.beportfolio.skills.mapperlayer;

import com.portfolio.beportfolio.projects.dataaccesslayer.Project;
import com.portfolio.beportfolio.skills.dataaccesslayer.Skill;
import com.portfolio.beportfolio.skills.presentationlayer.SkillResponseModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SkillResponseMapper {
    @Mapping(source = "skillId", target = "skillId")
    SkillResponseModel entityToResponseModel(Skill skill);

    List<SkillResponseModel> entityListToResponseModelList(List<Skill> skillList);
}
