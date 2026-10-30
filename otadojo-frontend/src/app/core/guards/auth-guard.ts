import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // ¿Está logueado? Déjalo pasar
  if (authService.isLoggedIn()) {
    return true;
  }

  // No está logueado, redirigir al login
  router.navigate(['/login']);
  return false;
};