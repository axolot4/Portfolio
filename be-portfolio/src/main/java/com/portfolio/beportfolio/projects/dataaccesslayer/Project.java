package com.portfolio.beportfolio.projects.dataaccesslayer;

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
@Document(collection = "projects")
public class Project {

    @Id
    private String projectId;

    @Indexed(unique = true)
    private ProjectIdentifier projectIdentifier;
    private String projectName;
    private String projectDescriptionEn;
    private String projectDescriptionFr;
    private List<String> projectImages;
}
