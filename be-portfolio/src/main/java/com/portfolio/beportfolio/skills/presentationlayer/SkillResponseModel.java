package com.portfolio.beportfolio.skills.presentationlayer;

import lombok.*;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
@Builder
@AllArgsConstructor
@Getter
@Setter
public class SkillResponseModel {
    private String skillId;
    private String skillName;
}
