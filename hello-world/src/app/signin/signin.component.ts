import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent {
  signInForm: FormGroup;
  @Output() close = new EventEmitter<void>();
  @Output() showLogin = new EventEmitter<void>();
  apiUrl = 'http://localhost:3000/users'; // JSON server URL

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.signInForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const { name, surname, username, email, password } = this.signInForm.value;

      this.checkEmailExists(email).subscribe(exists => {
        if (exists) {
          console.log('Email already exists');
        } else {
          this.addUser({ name, surname, username, email, password }).subscribe(response => {
            console.log('Sign In successful', response);
            this.loginAndClose();
          });
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`).pipe(
      map((users: any[]) => users.length > 0)
    );
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  closeOverlay() {
    this.close.emit();
  }

  loginAndClose() {
    this.showLogin.emit();
    this.closeOverlay();
  }
}
