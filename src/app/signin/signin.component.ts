import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { User } from '../../classes/user'; // Import User class
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent {
  signInForm: FormGroup;
  errorMessage: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() showLogin = new EventEmitter<void>();
  apiUrl = 'http://localhost:3000/users'; // JSON server URL

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.signInForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get firstName() { return this.signInForm.get('firstName'); }
  get lastName() { return this.signInForm.get('lastName'); }
  get username() { return this.signInForm.get('username'); }
  get email() { return this.signInForm.get('email'); }
  get password() { return this.signInForm.get('password'); }

  onSubmit() {
    if (this.signInForm.valid) {
      const { firstName, lastName, username, email, password } = this.signInForm.value;

      this.checkEmailExists(email).subscribe(exists => {
        if (exists) {
          this.errorMessage = 'Email already exists';
        } else {
          const newUser = new User(uuidv4(), firstName, lastName, username, email, '', ''); // Create a new User instance
          this.addUser(newUser).subscribe(response => {
            console.log('Sign In successful', response);
            this.authService.setUserId(response.id); // Assuming response has an 'id' field
            this.closeOverlay();
          }, error => {
            this.errorMessage = 'Error signing up. Please try again.';
          });
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.authService.checkEmailExists(email)
  }

  addUser(user: User): Observable<any> {
    return this.authService.addUser(user)
  }

  closeOverlay() {
    this.close.emit();
  }

  openLoginOverlay() {
    this.showLogin.emit();
    this.closeOverlay();
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.closeOverlay();
    }
  }

  onFormClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
