import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { QuizService } from '../../core/services/quiz';
import { AuthService } from '../../core/services/auth';
import { Quiz, Categoria, CATEGORIA_LABEL, PUNTOS_DIFICULTAD } from '../../shared/models/quiz.model';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatTooltipModule
  ],
  templateUrl: './quiz-list.html',
  styleUrl: './quiz-list.scss'
})
export class QuizListComponent implements OnInit {
  allQuizzes: Quiz[] = [];
  filteredQuizzes: Quiz[] = [];
  loading = true;
  error = '';
  selectedCategory: string = '';

  readonly categories: { value: string; label: string; icon: string }[] = [
    { value: '', label: 'Todos', icon: 'apps' },
    { value: 'anime-clasico', label: 'Anime Clásico', icon: 'auto_stories' },
    { value: 'anime-moderno', label: 'Anime Moderno', icon: 'new_releases' },
    { value: 'videojuegos', label: 'Videojuegos', icon: 'sports_esports' }
  ];

  constructor(
    private quizService: QuizService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe({
      next: (response) => {
        this.allQuizzes = response.quizzes || [];
        this.filteredQuizzes = this.allQuizzes;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = 'Error al cargar los quizzes';
      }
    });
  }

  filterByCategory(categoria: string): void {
    this.selectedCategory = categoria;
    this.filteredQuizzes = categoria
      ? this.allQuizzes.filter(q => q.categoria === categoria)
      : this.allQuizzes;
  }

  playQuiz(quizId: number): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/quiz', quizId]);
    } else {
      this.router.navigate(['/login']);
    }
  }

  getDifficultyColor(dificultad: string): string {
    const colors: Record<string, string> = { facil: '#4caf50', medio: '#ff9800', dificil: '#f44336' };
    return colors[dificultad] || '#9e9e9e';
  }

  getDifficultyLabel(dificultad: string): string {
    const labels: Record<string, string> = { facil: 'Fácil', medio: 'Medio', dificil: 'Difícil' };
    return labels[dificultad] || dificultad;
  }

  getDifficultyIcon(dificultad: string): string {
    const icons: Record<string, string> = { facil: 'sentiment_satisfied', medio: 'sentiment_neutral', dificil: 'sentiment_very_dissatisfied' };
    return icons[dificultad] || 'help';
  }

  getCategoryLabel(categoria: string): string {
    return CATEGORIA_LABEL[categoria as Categoria] || categoria;
  }

  getPointsPerQuestion(dificultad: string): number {
    return PUNTOS_DIFICULTAD[dificultad as keyof typeof PUNTOS_DIFICULTAD] || 100;
  }

  getCategoryCount(categoria: string): number {
    return categoria
      ? this.allQuizzes.filter(q => q.categoria === categoria).length
      : this.allQuizzes.length;
  }

  getCategoryIcon(categoria: string): string {
    const icons: Record<string, string> = {
      'anime-clasico': '⚔️',
      'anime-moderno': '✨',
      'videojuegos': '🎮'
    };
    return icons[categoria] || '❓';
  }
}
