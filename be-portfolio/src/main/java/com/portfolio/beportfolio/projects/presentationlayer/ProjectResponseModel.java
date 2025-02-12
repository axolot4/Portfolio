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
    private String projectDescription;
    private List<String> projectImages;
}
