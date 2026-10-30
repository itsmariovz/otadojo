import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
  // Rutas públicas
  { path: 'login', loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./features/auth/register/register').then(m => m.RegisterComponent) },
  { path: 'quizzes', loadComponent: () => import('./features/quiz-list/quiz-list').then(m => m.QuizListComponent) },
  { path: 'rankings', loadComponent: () => import('./features/rankings/rankings').then(m => m.RankingsComponent) },

  // Rutas protegidas (requieren login)
  { path: 'quiz/:id', loadComponent: () => import('./features/quiz-play/quiz-play').then(m => m.QuizPlayComponent), canActivate: [authGuard] },
  { path: 'results', loadComponent: () => import('./features/results/results').then(m => m.ResultsComponent), canActivate: [authGuard] },
  { path: 'profile', loadComponent: () => import('./features/profile/profile').then(m => m.ProfileComponent), canActivate: [authGuard] },

  // Rutas admin (requieren login + admin)
  { path: 'admin', loadComponent: () => import('./features/admin/dashboard/dashboard').then(m => m.DashboardComponent), canActivate: [adminGuard] },
  { path: 'admin/create-quiz', loadComponent: () => import('./features/admin/create-quiz/create-quiz').then(m => m.CreateQuizComponent), canActivate: [adminGuard] },
  { path: 'admin/create-questions/:quizId', loadComponent: () => import('./features/admin/create-questions/create-questions').then(m => m.CreateQuestionsComponent), canActivate: [adminGuard] },

  // Ruta por defecto
  { path: '', redirectTo: '/quizzes', pathMatch: 'full' },

  // Ruta 404
  { path: '**', redirectTo: '/quizzes' }
];