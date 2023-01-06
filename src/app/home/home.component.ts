import { Component, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { PostModel } from '../shared/post-model';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Array<PostModel> = [];
  faComments: IconProp;
  faArrowUp: IconProp;
  faArrowDown: IconProp;
  upvoteColor: string;
  downvoteColor: string;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(
      data => {
        this.posts = data;
      }
    )
  }

  goToPost(postId: number) {
  }

  downvotePost() {
  }

  upvotePost() {
  }
}
