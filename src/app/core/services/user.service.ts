import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Response } from '../models/base';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  registerUser(email: string, password: string): Observable<Response> {
    const data = { email, password };
    return this.http.post<Response>(`${environment.APIEndpoint}/users/sign-up`, data);
  }

  loginUser(email: string, password: string): Observable<Response> {
    const data = { email, password };
    return this.http.post<Response>(`${environment.APIEndpoint}/users/sign-in`, data);
  }
}
