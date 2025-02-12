package com.portfolio.beportfolio.projects.presentationlayer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectRequestModel {
    private String projectName;
    private String projectDescription;
    private List<String> projectImages;
}
