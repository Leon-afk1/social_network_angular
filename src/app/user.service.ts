import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'http://localhost:3000/users'; 

  constructor(private http: HttpClient) { }

  getUserById(userId: string): Observable<User> {
    const url = `${this.usersUrl}/${userId}`;
    return this.http.get<User>(url);
  }
}
