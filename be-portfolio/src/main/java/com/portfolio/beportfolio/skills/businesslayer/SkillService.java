package com.portfolio.beportfolio.skills.businesslayer;

import com.portfolio.beportfolio.skills.presentationlayer.SkillRequestModel;
import com.portfolio.beportfolio.skills.presentationlayer.SkillResponseModel;

import java.util.List;

public interface SkillService {
    List<SkillResponseModel> getAllSkills();
    SkillResponseModel getSkillBySkillId(String skillId);
    SkillResponseModel addSkill(SkillRequestModel skillRequestModel);
    SkillResponseModel updateSkill(String skillId, SkillRequestModel skillRequestModel);
    void deleteSkill(String skillId);
}
