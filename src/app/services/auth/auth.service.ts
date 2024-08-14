import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginPayload, User, UserRole } from '../../types/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private userRole: string | null = null;
  private url = 'https://dummyjson.com/auth/login';

  constructor(private http: HttpClient, private router: Router) {
    // Check token on service initialization
    const token = localStorage.getItem('token');
    if (token && this.validAuthentication(token)) {
      this.isAuthenticated = true;
      const decoded: any = jwtDecode(token);
      this.userRole = decoded.role;
    }
  }

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

  validAuthentication(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      // Check if the token is expired (assuming the token has an 'exp' field)
      if (decoded.exp && Date.now() / 1000 < decoded.exp) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  getIsAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token && this.validAuthentication(token)) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
    return this.isAuthenticated;
  }

  getUserRole(): string | null {
    return this.userRole;
  }

  getLogin(data: LoginPayload): Observable<User> {
    return this.http.post<User>(this.url, data);
  }
}
