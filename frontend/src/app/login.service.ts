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

  /**
   * Método que realiza la petición al backend para ejecutar un login.
   * Retorna datos de autenticación y autorización si el login fue exitoso. 
   */
  performLogin(credentials: Credentials) {
    return this.http.post<UserSession>(`${BACKEND_HOST}/login`, credentials)
  }

  /**
   * Método que realiza la petición al backend para ejecutar un logout.
   */
  performLogout() {
    return this.http.get(`${BACKEND_HOST}/logout`, {
      headers: getAuthHeaders()
    })
  }
}
