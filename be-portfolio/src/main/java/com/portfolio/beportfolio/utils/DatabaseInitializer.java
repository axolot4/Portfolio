package com.portfolio.beportfolio.utils;
import com.portfolio.beportfolio.comments.dataaccesslayer.Comment;
import com.portfolio.beportfolio.comments.dataaccesslayer.CommentRepository;
import com.portfolio.beportfolio.projects.dataaccesslayer.Project;
import com.portfolio.beportfolio.projects.dataaccesslayer.ProjectRepository;
import com.portfolio.beportfolio.skills.dataaccesslayer.Skill;
import com.portfolio.beportfolio.skills.dataaccesslayer.SkillRepository;
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
    @Autowired
    private SkillRepository skillRepository;

    @Override
    public void run(String... args) throws Exception {
        if (projectRepository.count() == 0) {
            List<Project> projectList = new ArrayList<>();

            Project project1 = new Project().builder()
                    .projectName("Le Coin Games Over Website")
                    .projectDescriptionEn("In a team of four, we developed a website for a local store in Saint-Hubert called Le Coin Games Over. The website was developed using " +
                            "TypeScript, Java Spring Boot, and MongoDB. This project was developed using the Scrum methodology so every one or " +
                            "two weeks, we would have a sprint review meeting with the client to show the progress of the website. This project" +
                            "required collaboration and coordination between team members to ensure that the website was developed according to the" +
                            "requirements of the client. We would also have multiple Scrum meetings throughout the sprint to discuss the progress" +
                            "and help team members that needed it")
                    .projectDescriptionFr("Dans une équipe de quatre, nous avons développé un site web pour un magasin local à Saint-Hubert appelé Le Coin Games Over." +
                            "Le site a été développé en TypeScript, Java Spring Boot et MongoDB." +
                            "Ce projet a été réalisé en utilisant la méthodologie Scrum, donc toutes les une ou deux semaines, nous avions une réunion de revue de sprint avec le client pour lui présenter l’avancement du site web." +
                            "Ce projet a nécessité une collaboration et une coordination étroite entre les membres de l’équipe afin de garantir que le site web soit développé selon les exigences du client." +
                            "Nous avons également tenu plusieurs réunions Scrum tout au long du sprint pour discuter de l’avancement et aider les membres de l’équipe qui en avaient besoin.")
                    .projectImages(List.of("https://i.ibb.co/8ntP1Yfp/CGOmainpage.jpg"))
                    .build();
            projectList.add(project1);

            Project project2 = new Project().builder()
                    .projectName("Champlain Pet Clinic")
                    .projectDescriptionEn("This was an applcation developed to simulate what it would be like to work in a big project involving a lot" +
                            "of peaople. We were more or less 50 people divided into teams of 5 and six and all of the teams were assigned " +
                            "different parts of the application to work on. My team had the task of developing the bills subdomain of the application." +
                            "So we had to create a frontend to display the bills properly and a backend to fetch the bills and do all of the operations" +
                            "that we wanted to implement. This project was made in Java Spring Boot and Typescript (we didn't mess with the database too" +
                            "much except for calls to the backend. This project used the Scrum methodology meaning we had Sprints and Sprint reviews every" +
                            "one or two weeks to report what we had done and what full-stack functionality we had implemented. We also had multiple Scrum" +
                            "meetings to report our progress to the team and help out those who needed it.<br />")
                    .projectDescriptionFr("Il s’agissait d’une application développée pour simuler le travail sur un grand projet impliquant de nombreuses personnes." +
                            "Nous étions environ 50 personnes, divisées en équipes de 5 à 6 membres, et chaque équipe s’était vu attribuer une partie spécifique de l’application à développer." +
                            "Mon équipe avait pour mission de développer le sous-domaine de la gestion des factures de l’application." +
                            "Nous devions donc créer un frontend pour afficher correctement les factures et un backend pour récupérer ces factures et effectuer toutes les opérations que nous voulions implémenter." +
                            "Ce projet a été développé en Java Spring Boot et TypeScript (nous n’avons pas beaucoup modifié la base de données, sauf pour les appels au backend)." +
                            "Ce projet utilisait la méthodologie Scrum, ce qui signifie que nous avions des Sprints et des revues de Sprint toutes les une ou deux semaines pour présenter nos avancées et les fonctionnalités full-stack que nous avions implémentées." +
                            "Nous avions également plusieurs réunions Scrum pour rendre compte de nos progrès à l’équipe et aider ceux qui en avaient besoin.")
                    .projectImages(List.of("https://img1.wsimg.com/isteam/ip/758c4e6c-b524-48be-af2b-1e0859ee07d3/logo/989f1b62-edc7-4045-a17e-e3d69a0b27f8.jpg"))
                    .build();
            projectList.add(project2);

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

        if (skillRepository.count() == 0) {
            List<Skill> skillList = new ArrayList<>();
            Skill skill1 = new Skill().builder()
                    .skillName("Java")
                    .build();
            skillList.add(skill1);
            Skill skill2 = new Skill().builder()
                    .skillName("C#")
                    .build();
            skillList.add(skill2);
            Skill skill3 = new Skill().builder()
                    .skillName("SQL")
                    .build();
            skillList.add(skill3);

            skillRepository.saveAll(skillList);
        }
    }
}