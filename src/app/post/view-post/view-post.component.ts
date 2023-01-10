import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { CommentModel } from 'src/app/comment/comment.model';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post.model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentModel;
  comments: Array<CommentModel> = [];

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute,
    private commentService: CommentService) { }

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.params['id'];
    this.getPostById(this.postId);
    this.getCommentsForPost();

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });

    this.commentPayload = {
      text: '',
      postId: this.postId
    }
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get('text').value;
    this.commentService.postComment(this.commentPayload).subscribe(
      data => {
        this.commentForm.get('text').setValue('');
        this.getCommentsForPost();
      }, error => {
        throwError(error);
      }
    );
  }

  private getPostById(id: number) {
    this.postService.getPost(this.postId).subscribe(
      data => {
        this.post = data;
      }, error => {
        throwError(error);
      }
    );
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(
      data => {
        this.comments = data;
      }, error => {
        throwError(error);
      }
    );
  }
}
