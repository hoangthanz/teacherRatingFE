import { Component } from '@angular/core';
import { AuthenticationService } from '../core/guards/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = true;
  constructor(private authenticationService: AuthenticationService) {
    const oldUsername = localStorage.getItem('username');
    const oldPassword = localStorage.getItem('password');
    const hasRemember = localStorage.getItem('hasRemember');

    if (hasRemember === 'true') {
      this.rememberMe = true;
    }

    if (oldPassword && oldUsername) {
      this.username = oldUsername;
      this.password = oldPassword;
    }
  }

  // api call login here
  headerContent = 'Trường THPT Trần Nguyên Hãn';
  login() {
    this.authenticationService.login(
      this.username,
      this.password,
      this.rememberMe
    );
  }
}
