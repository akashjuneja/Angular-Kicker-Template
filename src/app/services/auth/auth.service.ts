import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginPayload, User, UserRole } from '../../types/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private userRole: string | null = null;
  private url = 'https://dummyjson.com/auth/login';
  constructor(private http: HttpClient, private router: Router) {}

  login(data: UserRole) {
    localStorage.setItem('token', data.token);
    this.userRole = data.role;
    this.isAuthenticated = true;
    this.router.navigate(['/home']);
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.userRole = null;
    this.router.navigate(['/login']);
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getUserRole() {
    return this.userRole;
  }

  getLogin(data: LoginPayload): Observable<User> {
    return this.http.post<User>(this.url, data);
  }
}
