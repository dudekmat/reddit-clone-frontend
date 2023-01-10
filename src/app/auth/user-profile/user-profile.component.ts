import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentModel } from 'src/app/comment/comment.model';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post.model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  name: string;
  posts: Array<PostModel> = [];
  comments: Array<CommentModel> = [];
  postCount: number;
  commentCount: number;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
    private commentService: CommentService) { }

  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.params['name'];

    this.postService.getAllPostsByUser(this.name).subscribe(
      data => {
        this.posts = data;
        this.postCount = data.length;
      }
    );

    this.commentService.getAllCommentsByUser(this.name).subscribe(
      data => {
        this.comments = data;
        this.commentCount = data.length;
      }
    );
  }
}
