package com.portfolio.beportfolio.comments.dataaccesslayer;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Setter
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Document(collection = "comments")
public class Comment {
    @Id
    private String commentId;

    @Indexed(unique = true)
    private CommentIdentifier commentIdentifier;
    private String user;
    private String commentContent;

    @Field(name = "approved")
    private boolean approved = false;

}
