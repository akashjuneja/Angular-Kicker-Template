import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const protectedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (
    !authService.getIsAuthenticated() ||
    authService.getUserRole() !== 'admin'
  ) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
