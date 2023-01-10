import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentModel } from './comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<Array<CommentModel>> {
    return this.http.get<Array<CommentModel>>(`${this.baseUrl}/by-post/${postId}`);
  }

  postComment(commentPayload: CommentModel): Observable<any> {
    return this.http.post<any>(this.baseUrl, commentPayload);
  }

  getAllCommentsByUser(username: string): Observable<Array<CommentModel>> {
    return this.http.get<Array<CommentModel>>(`${this.baseUrl}/by-user/${username}`);
  }
}
