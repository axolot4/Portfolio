package com.portfolio.beportfolio.projects.dataaccesslayer;

import lombok.Getter;

import java.util.UUID;

@Getter
public class ProjectIdentifier {
    private final String projectId;
    public ProjectIdentifier(){
        this.projectId = UUID.randomUUID().toString();
    }
}
