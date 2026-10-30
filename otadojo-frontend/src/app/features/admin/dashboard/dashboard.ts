import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { QuizService } from '../../../core/services/quiz';
import { Quiz, Categoria, CATEGORIA_LABEL } from '../../../shared/models/quiz.model';

@Component({
  selector: 'app-admin-dashboard',
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
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  quizzes: Quiz[] = [];
  loading = true;
  displayedColumns: string[] = ['id', 'titulo', 'categoria', 'dificultad', 'num_preguntas', 'acciones'];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizService.getQuizzes().subscribe({
      next: (response) => {
        this.loading = false;
        this.quizzes = response.quizzes || [];
      },
      error: (error) => {
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  getCategoryLabel(categoria: string): string {
    return CATEGORIA_LABEL[categoria as Categoria] || categoria;
  }

  getDifficultyLabel(dificultad: string): string {
    switch (dificultad) {
      case 'facil': return '🟢 Fácil';
      case 'medio': return '🟡 Medio';
      case 'dificil': return '🔴 Difícil';
      default: return dificultad;
    }
  }
}