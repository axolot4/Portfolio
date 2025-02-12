package com.portfolio.beportfolio.utils;
import com.portfolio.beportfolio.comments.dataaccesslayer.Comment;
import com.portfolio.beportfolio.comments.dataaccesslayer.CommentRepository;
import com.portfolio.beportfolio.projects.dataaccesslayer.Project;
import com.portfolio.beportfolio.projects.dataaccesslayer.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public void run(String... args) throws Exception {
        if (projectRepository.count() == 0) {
            List<Project> projectList = new ArrayList<>();

            Project project1 = new Project().builder()
                    .projectName("Project 1")
                    .projectDescription("This is project 1")
                    .projectImages(List.of("image1.jpg", "image2.jpg"))
                    .build();
            projectList.add(project1);

            Project project2 = new Project().builder()
                    .projectName("Project 2")
                    .projectDescription("This is project 2")
                    .projectImages(List.of("image3.jpg", "image4.jpg"))
                    .build();
            projectList.add(project2);

            Project project3 = new Project().builder()
                    .projectName("Project 3")
                    .projectDescription("This is project 3")
                    .projectImages(List.of("image5.jpg", "image6.jpg"))
                    .build();
            projectList.add(project3);

            projectRepository.saveAll(projectList);
        }

        if (commentRepository.count() == 0) {
            List<Comment> commentList = new ArrayList<>();
            Comment comment1 = new Comment().builder()
                    .user("Lebron James")
                    .commentContent("Baskemtbla")
                    .build();
            commentList.add(comment1);

            commentRepository.saveAll(commentList);
        }
    }
}