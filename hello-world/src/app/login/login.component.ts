// src/app/login/login.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  @Output() close = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.http.get<any[]>(`http://localhost:3000/users?email=${email}&password=${password}`)
        .subscribe(users => {
          if (users.length > 0) {
            // Successfully authenticated
            console.log('Login successful', users[0]);
            this.closeOverlay();
          } else {
            // Authentication failed
            console.log('Login failed');
          }
        });
    }
  }

  closeOverlay() {
    this.close.emit();
  }
}
