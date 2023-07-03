import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  credentials: any

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  login() {
    const response = this.loginService.performLogin(this.credentials).subscribe(data => {
      console.log(data)
    })
  }


}
