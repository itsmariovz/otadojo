import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // ¿Está logueado Y es admin? Déjalo pasar
  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true;
  }

  // No es admin, redirigir al dashboard
  router.navigate(['/quizzes']);
  return false;
};