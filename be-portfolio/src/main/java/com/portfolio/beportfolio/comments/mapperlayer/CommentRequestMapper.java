package com.portfolio.beportfolio.comments.mapperlayer;

import com.portfolio.beportfolio.comments.dataaccesslayer.Comment;
import com.portfolio.beportfolio.comments.dataaccesslayer.CommentIdentifier;
import com.portfolio.beportfolio.comments.presentationlayer.CommentRequestModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface CommentRequestMapper {
    @Mappings({
            @Mapping(target = "commentId", ignore = true),
    })
    Comment requestModelToEntity(CommentRequestModel commentRequestModel, CommentIdentifier commentIdentifier);
}
