package com.portfolio.beportfolio.comments.dataaccesslayer;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
    Comment findCommentByCommentId(String commentId);
}
