import { Routes } from '@angular/router';
import { publicGuard } from './gaurds/public/public.guard';
import {
  privateGuard,
  privateGuardChild,
} from './gaurds/private/private.guard';
import { protectedGuard } from './gaurds/protected/protected.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/landing/landing.component').then(
        (c) => c.LandingComponent
      ),
    canActivate: [publicGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((c) => c.LoginComponent),
    canActivate: [publicGuard],
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((c) => c.HomeComponent),
    canActivate: [privateGuard],
    canActivateChild: [privateGuardChild],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/main/main.component').then((c) => c.MainComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products.component').then(
            (c) => c.ProductsComponent
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/users/users.component').then(
            (c) => c.UsersComponent
          ),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
        canActivate: [protectedGuard],
      },
    ],
  },
  {
    path: 'unauth',
    loadComponent: () =>
      import('./common/unauthorized/unauthorized.component').then(
        (c) => c.UnauthorizedComponent
      ),
  },
  { path: '**', redirectTo: '' }, // Redirect any unknown path to LandingPage
];
