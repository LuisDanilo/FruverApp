import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Credentials } from 'src/models/user-session.model';
import get from 'lodash.get'
import { Router } from '@angular/router';
import { UserRoles } from 'src/utils/enums';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  // Credenciales usadas para login
  credentials: Credentials = new Credentials("", "")

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Recuperar rol del usuario autenticado (si existe usuario autenticado)
    const roleId = localStorage.getItem('roleId') || 0
    if (roleId === UserRoles.ADMIN) {
      // alert("You a re already signed in, redirecting")
      this.router.navigate(['/admin'])
    } else if (roleId === UserRoles.USER) {
      // alert("You a re already signed in, redirecting")
      this.router.navigate(['/shop'])
    }
  }

  /**
   * Método que permite hacer login
   * Si es exitoso guarda la info en local storage del navegador
   */
  login() {
    this.loginService
      .performLogin(this.credentials)
      .subscribe(data => {
        // Recuperar info del usuario autenticado
        const sessionId = get(data, 'sessionId', null)
        const roleId = get(data, 'roleId', '')
        const username = get(data, 'username', '')
        const address = get(data, 'address', '')
        const dni = get(data, 'dni', '')
        const phone = get(data, 'phone', '')
        if (sessionId) {
          // Guardar info en el navegador
          localStorage.setItem('sessionId', sessionId)
          localStorage.setItem('roleId', roleId)
          localStorage.setItem('username', username)
          localStorage.setItem('address', address)
          localStorage.setItem('dni', dni)
          localStorage.setItem('phone', phone)
          // Redireccionar
          if (roleId === UserRoles.ADMIN) {
            this.router.navigate(['/admin'])
          } else if (roleId === UserRoles.USER) {
            this.router.navigate(['/shop'])
          }
        }
      })
  }
}
