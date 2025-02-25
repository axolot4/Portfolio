package com.portfolio.beportfolio.skills.dataaccesslayer;

import com.portfolio.beportfolio.projects.dataaccesslayer.ProjectIdentifier;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Document(collection = "skills")
public class Skill {
    @Id
    private String skillId;

    @Indexed(unique = true)
    private SkillIdentifier skillIdentifier;
    private String skillName;
}
