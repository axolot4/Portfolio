package com.portfolio.beportfolio.comments.presentationlayer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentRequestModel {
    private String user;
    private String commentContent;
    private boolean approved;
}
