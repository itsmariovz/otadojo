import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserService } from '../../core/services/user';
import { AuthService } from '../../core/services/auth';
import { RankingEntry } from '../../shared/models/attempt.model';

@Component({
  selector: 'app-rankings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './rankings.html',
  styleUrl: './rankings.scss'
})
export class RankingsComponent implements OnInit {
  rankings: RankingEntry[] = [];
  loading = true;
  error = '';
  displayedColumns: string[] = ['posicion', 'username', 'puntos_totales', 'quizzes_jugados'];

  constructor(
    private userService: UserService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRankings();
  }

  loadRankings(): void {
    console.log('🔍 Cargando rankings...');
    
    this.userService.getRankings().subscribe({
      next: (response) => {
        console.log('✅ Respuesta rankings:', response);
        
        this.rankings = response.ranking || [];
        this.loading = false;
        
        console.log('✅ Rankings asignados:', this.rankings);
        
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('❌ Error:', error);
        this.loading = false;
        this.error = 'Error al cargar los rankings';
        this.cdr.detectChanges();
      }
    });
  }

  getMedal(index: number): string {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `#${index + 1}`;
    }
  }

  isCurrentUser(username: string): boolean {
    return this.authService.getCurrentUser()?.username === username;
  }
}