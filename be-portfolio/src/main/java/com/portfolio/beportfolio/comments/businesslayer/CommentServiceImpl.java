package com.portfolio.beportfolio.comments.businesslayer;

import com.portfolio.beportfolio.comments.dataaccesslayer.Comment;
import com.portfolio.beportfolio.comments.dataaccesslayer.CommentIdentifier;
import com.portfolio.beportfolio.comments.dataaccesslayer.CommentRepository;
import com.portfolio.beportfolio.comments.mapperlayer.CommentRequestMapper;
import com.portfolio.beportfolio.comments.mapperlayer.CommentResponseMapper;
import com.portfolio.beportfolio.comments.presentationlayer.CommentRequestModel;
import com.portfolio.beportfolio.comments.presentationlayer.CommentResponseModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService{

    public CommentRepository commentRepository;
    private final CommentResponseMapper commentResponseMapper;
    private final CommentRequestMapper commentRequestMapper;

    public CommentServiceImpl(CommentResponseMapper commentResponseMapper, CommentRequestMapper commentRequestMapper, CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
        this.commentResponseMapper = commentResponseMapper;
        this.commentRequestMapper = commentRequestMapper;
    }

    @Override
    public List<CommentResponseModel> getAllComments() {
        List<Comment> comments = commentRepository.findAll();
        return commentResponseMapper.entityListToResponseModelList(comments);
    }

    @Override
    public CommentResponseModel getCommentByCommentId(String commentId) {
        Comment comment = commentRepository.findCommentByCommentId(commentId);
        return commentResponseMapper.entityToResponseModel(comment);
    }

    @Override
    public CommentResponseModel addComment(CommentRequestModel commentRequestModel) {
        Comment comment = commentRequestMapper.requestModelToEntity(commentRequestModel, new CommentIdentifier());
        commentRepository.save(comment);
        return commentResponseMapper.entityToResponseModel(comment);
    }

    @Override
    public CommentResponseModel updateComment(String commentId, CommentRequestModel commentRequestModel) {
        Comment exisitingComment = commentRepository.findCommentByCommentId(commentId);
        if (commentRequestModel.getUser() != null) {
            exisitingComment.setUser(commentRequestModel.getUser());
        }
        if (commentRequestModel.getCommentContent() != null) {
            exisitingComment.setCommentContent(commentRequestModel.getCommentContent());
        }
        Comment updatedComment = commentRepository.save(exisitingComment);
        return commentResponseMapper.entityToResponseModel(updatedComment);
    }

    @Override
    public void deleteComment(String commentId) {
        Comment comment = commentRepository.findCommentByCommentId(commentId);
        commentRepository.delete(comment);
    }
}
