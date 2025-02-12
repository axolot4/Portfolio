package com.portfolio.beportfolio.comments.mapperlayer;

import com.portfolio.beportfolio.comments.dataaccesslayer.Comment;
import com.portfolio.beportfolio.comments.presentationlayer.CommentResponseModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentResponseMapper {
    @Mapping(source = "commentId", target = "commentId")
    CommentResponseModel entityToResponseModel(Comment comment);

    List<CommentResponseModel> entityListToResponseModelList(List<Comment> commentList);
}
