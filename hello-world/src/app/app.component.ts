import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showSignIn = false;
  showLogin = false;

  showSignInOverlay() {
    this.showSignIn = true;
  }

  closeSignInOverlay() {
    this.showSignIn = false;
  }

  showLoginOverlay() {
    this.showLogin = true;
  }

  closeLoginOverlay() {
    this.showLogin = false;
  }
}
