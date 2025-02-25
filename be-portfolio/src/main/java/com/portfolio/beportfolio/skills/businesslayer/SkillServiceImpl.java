package com.portfolio.beportfolio.skills.businesslayer;

import com.portfolio.beportfolio.skills.dataaccesslayer.Skill;
import com.portfolio.beportfolio.skills.dataaccesslayer.SkillIdentifier;
import com.portfolio.beportfolio.skills.dataaccesslayer.SkillRepository;
import com.portfolio.beportfolio.skills.mapperlayer.SkillRequestMapper;
import com.portfolio.beportfolio.skills.mapperlayer.SkillResponseMapper;
import com.portfolio.beportfolio.skills.presentationlayer.SkillRequestModel;
import com.portfolio.beportfolio.skills.presentationlayer.SkillResponseModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class  SkillServiceImpl implements SkillService {

    public SkillRepository skillRepository;
    private final SkillResponseMapper skillResponseMapper;
    private final SkillRequestMapper skillRequestMapper;

    public SkillServiceImpl(SkillRepository skillRepository, SkillResponseMapper skillResponseMapper, SkillRequestMapper skillRequestMapper) {
        this.skillRepository = skillRepository;
        this.skillResponseMapper = skillResponseMapper;
        this.skillRequestMapper = skillRequestMapper;
    }

    @Override
    public List<SkillResponseModel> getAllSkills() {
        List<Skill> skills = skillRepository.findAll();
        return skillResponseMapper.entityListToResponseModelList(skills);
    }

    @Override
    public SkillResponseModel getSkillBySkillId(String skillId) {
        Skill skill = skillRepository.findSkillBySkillId(skillId);
        return skillResponseMapper.entityToResponseModel(skill);
    }

    @Override
    public SkillResponseModel addSkill(SkillRequestModel skillRequestModel) {
        Skill skill = skillRequestMapper.requestModelToEntity(skillRequestModel, new SkillIdentifier());
        Skill savedSkill = skillRepository.save(skill);
        return skillResponseMapper.entityToResponseModel(savedSkill);
    }

    @Override
    public SkillResponseModel updateSkill(String skillId, SkillRequestModel skillRequestModel) {
        Skill existingSkill = skillRepository.findSkillBySkillId(skillId);
        if (skillRequestModel.getSkillName() != null) {
            existingSkill.setSkillName(skillRequestModel.getSkillName());
        }
        Skill updatedSkill = skillRepository.save(existingSkill);
        return skillResponseMapper.entityToResponseModel(updatedSkill);
    }

    @Override
    public void deleteSkill(String skillId) {
        Skill existingSkill = skillRepository.findSkillBySkillId(skillId);
        skillRepository.delete(existingSkill);
    }
}
