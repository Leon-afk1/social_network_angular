import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'login-app';
  showSignIn = false;
  showLogin = false;

  constructor(public authService: AuthService) {}

  toggleSignIn() {
    this.showSignIn = !this.showSignIn;
  }

  toggleLogin() {
    this.showLogin = !this.showLogin;
  }

  closeSignIn() {
    this.showSignIn = false;
  }

  closeLogin() {
    this.showLogin = false;
  }

  logout() {
    this.authService.logout();
  }
}
