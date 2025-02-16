package com.portfolio.beportfolio.comments.dataaccesslayer;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
    Comment findCommentByCommentId(String commentId);

    List<Comment> findCommentByApproved(boolean approved);
}
