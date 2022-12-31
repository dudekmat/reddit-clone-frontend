import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, signupRequestPayload)
  }
}
