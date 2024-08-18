import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/auth/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    if (isTokenExpired(token)) {
      authService.logout();
      router.navigate(['/unauth']);
      throw new Error('Token expired');
    }

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Unauthorized
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(error);
    })
  );
};

function isTokenExpired(token: string): boolean {
  try {
    const decoded: any = jwtDecode(token);
    if (decoded.exp && Date.now() / 1000 > decoded.exp) {
      return true;
    }
    return false;
  } catch (e) {
    return true;
  }
}
