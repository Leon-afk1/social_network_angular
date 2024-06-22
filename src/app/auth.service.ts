import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: string | null = null;
  private usersUrl = 'http://localhost:3000/users'; 


  constructor(private http: HttpClient) {
    this.userId = localStorage.getItem('userId');
  }

  setUserId(id: string) {
    this.userId = id;
    localStorage.setItem('userId', id);
  }

  clearUserId() {
    this.userId = null;
    localStorage.removeItem('userId');
  }

  getUserId(): string | null {
    return this.userId;
  }

  isLoggedIn(): boolean {
    return this.userId !== null;
  }

  logout() {
    this.clearUserId();
  }

  getUserById(userId: string): Observable<User> {
    const url = `${this.usersUrl}/${userId}`;
    return this.http.get<User>(url);
  }

  addUser(user: User): Observable<any> {
    return this.http.post(this.usersUrl, user).pipe(
      catchError(error => {
        console.error('Error adding user:', error);
        return of(null);
      })
    );
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.usersUrl}?email=${email}`).pipe(
      map((users: any[]) => users.length > 0),
      catchError(error => {
        console.error('Error checking email:', error);
        return of(false);
      })
    );
  }

  checkUserCredentials(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.usersUrl}?email=${email}&password=${password}`).pipe(
      map(users => users.length > 0 ? users[0] : null),
      catchError(error => {
        console.error('Error checking credentials:', error);
        return of(null);
      })
    );
  }

  
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.usersUrl}/${user.id}`, user);
  }

}
