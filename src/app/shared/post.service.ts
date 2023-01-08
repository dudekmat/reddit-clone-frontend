import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreatePostPayload } from '../post/create-post/create-post.payload';
import { PostModel } from './post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>(this.baseUrl);
  }

  createPost(createPostPayload: CreatePostPayload): Observable<any> {
    return this.http.post<CreatePostPayload>(this.baseUrl, createPostPayload);
  }
}
