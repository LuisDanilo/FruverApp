import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.sass']
})
export class LogoutButtonComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  performLogout() {
    this.loginService.performLogout().subscribe(data => {
      localStorage.removeItem('sessionId')
      localStorage.removeItem('roleId')
      this.router.navigate(['/login'])
    })
  }
}
