import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '../../core/services/auth';
import { UserService } from '../../core/services/user';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  estadisticas: any = null;
  historial: any[] = [];
  loading = true;
  error = '';
  displayedColumns: string[] = ['quiz_titulo', 'dificultad', 'puntos_obtenidos', 'respuestas_correctas', 'completado_at'];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Obtener usuario actual
    this.user = this.authService.getCurrentUser();
    
    console.log('👤 Usuario actual:', this.user);
    
    // Si no hay usuario, redirigir al login
    if (!this.user) {
      console.error('❌ No hay usuario logueado');
      this.router.navigate(['/login']);
      return;
    }

    // Si no tiene ID, hay un problema con el login
    if (!this.user.id) {
      console.error('❌ El usuario no tiene ID:', this.user);
      this.error = 'Error: El usuario no tiene ID. Por favor, cierra sesión y vuelve a iniciar.';
      this.loading = false;
      return;
    }

    // Cargar datos
    this.loadData();
  }

  loadData(): void {
    const userId = this.user!.id;
    
    console.log('🔍 Cargando datos del usuario ID:', userId);

    // Cargar perfil
    this.userService.getProfile(userId).subscribe({
      next: (response) => {
        console.log('✅ Respuesta perfil:', response);
        this.estadisticas = response.estadisticas || null;
        this.checkIfDoneLoading();
      },
      error: (error) => {
        console.error('❌ Error al cargar perfil:', error);
        this.checkIfDoneLoading();
      }
    });

    // Cargar historial
    this.userService.getHistory(userId).subscribe({
      next: (response) => {
        console.log('✅ Respuesta historial:', response);
        this.historial = response.historial || [];
        this.checkIfDoneLoading();
      },
      error: (error) => {
        console.error('❌ Error al cargar historial:', error);
        this.error = 'Error al cargar el historial';
        this.checkIfDoneLoading();
      }
    });
  }

  checkIfDoneLoading(): void {
    // Esperar un tick para que ambas peticiones terminen
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
      console.log('✅ Carga completada');
    }, 100);
  }

  getDifficultyLabel(dificultad: string): string {
    switch (dificultad) {
      case 'facil': return '🟢 Fácil';
      case 'medio': return '🟡 Medio';
      case 'dificil': return '🔴 Difícil';
      default: return dificultad;
    }
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}