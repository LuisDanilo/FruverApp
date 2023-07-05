import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.sass']
})
export class LogoutButtonComponent implements OnInit {
  // Nombre de usuario a mostrar
  username: string = ""

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    // Obtener username del local storage
    this.username = localStorage.getItem('username') || ""
  }

  /**
   * Método que permite hacer logout.
   * Comunica al backend del logout.
   * Remueve los datos almacenados localmente referentes a autenticación y autorización.
   */
  performLogout() {
    this.loginService.performLogout().subscribe(data => {
      localStorage.removeItem('sessionId')
      localStorage.removeItem('roleId')
      this.router.navigate(['/login'])
    })
  }
}
