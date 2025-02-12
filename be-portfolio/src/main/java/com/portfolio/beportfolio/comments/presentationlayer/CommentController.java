package com.portfolio.beportfolio.comments.presentationlayer;

import com.portfolio.beportfolio.comments.businesslayer.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/comments")
@Slf4j
public class CommentController {
    private CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public ResponseEntity<List<CommentResponseModel>> getAllComments() {
        return ResponseEntity.ok().body(commentService.getAllComments());
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<CommentResponseModel> getCommentByCommentId(@PathVariable String commentId) {
        CommentResponseModel comment = commentService.getCommentByCommentId(commentId);
        return ResponseEntity.ok(comment);
    }

    @PostMapping
    public ResponseEntity<CommentResponseModel> addComment(@RequestBody CommentRequestModel commentRequestModel) {
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.addComment(commentRequestModel));
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<CommentResponseModel> updateComment(@PathVariable String commentId,@RequestBody CommentRequestModel commentRequestModel) {
        return ResponseEntity.ok(commentService.updateComment(commentId, commentRequestModel));
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable String commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}
