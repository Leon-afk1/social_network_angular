import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  @Output() close = new EventEmitter<void>();
  apiUrl = 'http://localhost:3000/users'; // JSON server URL

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.checkUserCredentials(email, password).subscribe(user => {
        if (user) {
          console.log('Login successful', user);
          this.authService.setUserId(user.id);
          this.closeOverlay();
        } else {
          this.errorMessage = 'Email ou mot de passe non valide.';
        }
      });
    } else {
      this.errorMessage = 'Veuillez remplir tout les champs';
    }
  }

  checkUserCredentials(email: string, password: string): Observable<any> {
    return this.authService.checkUserCredentials(email,password)
  }

  closeOverlay() {
    this.close.emit();
  }

  onOverlayClick(event: MouseEvent) {
    this.closeOverlay();
  }

  onFormClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
