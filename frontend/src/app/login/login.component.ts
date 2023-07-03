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

  credentials: Credentials = new Credentials("", "")

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const roleId = localStorage.getItem('roleId') || 0
    if (roleId === UserRoles.ADMIN) {
      // alert("You a re already signed in, redirecting")
      this.router.navigate(['/products'])
    } else if (roleId === UserRoles.USER) {
      this.router.navigate(['/shop'])
    }
  }

  login() {
    this.loginService
      .performLogin(this.credentials)
      .subscribe(data => {
        const sessionId = get(data, 'sessionId', null)
        const roleId = get(data, 'roleId', null)
        const username = get(data, 'username', '')
        if (sessionId) {
          if (roleId === UserRoles.ADMIN) {
            localStorage.setItem('sessionId', sessionId)
            localStorage.setItem('roleId', roleId)
            localStorage.setItem('username', username)
            this.router.navigate(['/products'])
          } else if (roleId === UserRoles.USER) {
            localStorage.setItem('sessionId', sessionId)
            localStorage.setItem('roleId', roleId)
            localStorage.setItem('username', username)
            this.router.navigate(['/shop'])
          }
        }
      })
  }
}
