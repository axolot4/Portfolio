package com.portfolio.beportfolio.comments.businesslayer;

import com.portfolio.beportfolio.comments.presentationlayer.CommentRequestModel;
import com.portfolio.beportfolio.comments.presentationlayer.CommentResponseModel;

import java.util.List;

public interface CommentService {
    List<CommentResponseModel> getAllComments();
    CommentResponseModel getCommentByCommentId(String commentId);
    CommentResponseModel addComment(CommentRequestModel commentRequestModel);
    CommentResponseModel updateComment(String commentId, CommentRequestModel commentRequestModel);
    void deleteComment(String commentId);

}
