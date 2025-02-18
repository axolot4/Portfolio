package com.portfolio.beportfolio.projects.presentationlayer;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
@Builder
@AllArgsConstructor
@Getter
@Setter
public class ProjectResponseModel {
    private String projectId;
    private String projectName;
    private String projectDescriptionEn;
    private String projectDescriptionFr;
    private List<String> projectImages;
}
