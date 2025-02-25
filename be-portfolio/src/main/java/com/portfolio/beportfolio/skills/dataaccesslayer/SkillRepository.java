package com.portfolio.beportfolio.skills.dataaccesslayer;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepository extends MongoRepository<Skill, String> {
    Skill findSkillBySkillId(String skillId);
}
