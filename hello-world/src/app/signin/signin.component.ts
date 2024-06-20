import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';

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
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get name(): AbstractControl | null {
    return this.signInForm.get('name');
  }

  get surname(): AbstractControl | null {
    return this.signInForm.get('surname');
  }

  get username(): AbstractControl | null {
    return this.signInForm.get('username');
  }

  get email(): AbstractControl | null {
    return this.signInForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.signInForm.get('password');
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const { name, surname, username, email, password } = this.signInForm.value;

      this.checkEmailExists(email).subscribe(exists => {
        if (exists) {
          this.errorMessage = 'Email already exists';
        } else {
          this.addUser({ name, surname, username, email, password }).subscribe(response => {
            console.log('Sign In successful', response);
            this.authService.setUserId(response.id);
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
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`).pipe(
      map((users: any[]) => users.length > 0),
      catchError(error => {
        console.error('Error checking email:', error);
        return of(false);
      })
    );
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user).pipe(
      catchError(error => {
        console.error('Error adding user:', error);
        return of(null);
      })
    );
  }

  closeOverlay() {
    this.close.emit();
  }

  openLoginOverlay() {
    this.showLogin.emit();
    this.closeOverlay();
  }
}
