import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSession } from 'src/models/user-session.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  BACKEND_HOST = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  performLogin(credentials: any) {
    return this.http.post<UserSession>(`${this.BACKEND_HOST}/login`, credentials)
  }
}
