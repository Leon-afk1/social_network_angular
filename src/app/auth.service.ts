import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userId: string | null = null;

  constructor() {
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
}
