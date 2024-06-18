// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLogin = false; // Define the showLogin property

  toggleLogin() {
    this.showLogin = !this.showLogin; // Method to toggle login visibility
  }
}
