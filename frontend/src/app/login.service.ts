import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials, UserSession } from 'src/models/user-session.model';
import { BACKEND_HOST } from 'src/utils/constants';
import { getAuthHeaders } from 'src/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  performLogin(credentials: Credentials) {
    return this.http.post<{ data: UserSession }>(`${BACKEND_HOST}/login`, credentials)
  }

  performLogout() {
    return this.http.get(`${BACKEND_HOST}/logout`, {
      headers: getAuthHeaders()
    })
  }
}
