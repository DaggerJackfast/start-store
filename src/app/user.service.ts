import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../environments/environment';
import { map } from "rxjs/operators";
import {Response} from './domains';

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}
  registerUser(email: string, password: string){
    return this.http.post<Response>(`${environment.APIEndpoint}/users/sign-up`, {
      email,
      password
    });
  }
}
