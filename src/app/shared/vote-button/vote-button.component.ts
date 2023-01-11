import { Component, Input, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { PostModel } from '../post.model';
import { PostService } from '../post.service';
import { VoteType } from '../vote-type';
import { VotePayload } from '../vote.payload';
import { VoteService } from '../vote.service';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: PostModel;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  votePayload: VotePayload;
  upvoteColor: string;
  downvoteColor: string;

  constructor(private voteService: VoteService, private authService: AuthService,
    private postService: PostService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.votePayload = {
      voteType: undefined,
      postId: undefined
    };

    this.updateVoteDetails();
  }

  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(
      data => {
        this.post = data;
      }
    );
  }

  private vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(
      () => {
        this.updateVoteDetails();
      }, error => {
        this.toastr.error(error.error.message);
        throwError(error);
      }
    );
  }

}
