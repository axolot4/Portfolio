package com.portfolio.beportfolio.projects.presentationlayer;

import com.portfolio.beportfolio.projects.businesslayer.ProjectService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/projects")
@Slf4j
@CrossOrigin(origins = "*")
public class ProjectController {

    private ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponseModel>> getAllProjects() {
        return ResponseEntity.ok().body(projectService.getAllProjects());
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectResponseModel> getProjectByProjectId(@PathVariable String projectId) {
        ProjectResponseModel project = projectService.getProjectByProjectId(projectId);
        return ResponseEntity.ok().body(project);
    }

    @PostMapping
    public ResponseEntity<ProjectResponseModel> addProject(@RequestBody ProjectRequestModel projectRequestModel) {
        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.addProject(projectRequestModel));
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<ProjectResponseModel> updateProject(
            @PathVariable String projectId,
            @RequestBody ProjectRequestModel projectRequestModel) {
        return ResponseEntity.ok(projectService.updateProject(projectId, projectRequestModel));
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<Void> deleteProjectById(@PathVariable String projectId) {
        projectService.deleteProjectByProjectId(projectId);
        return ResponseEntity.noContent().build();
    }
}
