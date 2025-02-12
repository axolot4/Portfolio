package com.portfolio.beportfolio.comments.presentationlayer;

import lombok.*;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
@Builder
@AllArgsConstructor
@Getter
@Setter
public class CommentResponseModel {
    private String commentId;
    private String user;
    private String commentContent;
}
