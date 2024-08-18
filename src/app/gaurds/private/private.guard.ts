import { inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

const checkAuthentication = (): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.getIsAuthenticated()) {
    router.navigate(['/unauth']);
    return false;
  }
  return true;
};

export const privateGuard: CanActivateFn = (route, state) => {
  return checkAuthentication();
};

export const privateGuardChild: CanActivateChildFn = (route, state) => {
  return checkAuthentication();
};
