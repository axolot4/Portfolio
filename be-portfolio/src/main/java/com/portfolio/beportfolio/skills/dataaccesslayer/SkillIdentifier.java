package com.portfolio.beportfolio.skills.dataaccesslayer;

import lombok.Getter;

import java.util.UUID;

@Getter
public class SkillIdentifier {
    public String skillId;
    public SkillIdentifier() {
        this.skillId = UUID.randomUUID().toString();
    }
}
