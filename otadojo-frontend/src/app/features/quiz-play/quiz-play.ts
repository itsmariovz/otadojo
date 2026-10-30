import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

import { QuizService } from '../../core/services/quiz';
import { AttemptService } from '../../core/services/attempt';
import { Quiz, Question } from '../../shared/models/quiz.model';

@Component({
  selector: 'app-quiz-play',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule
  ],
  templateUrl: './quiz-play.html',
  styleUrl: './quiz-play.scss'
})
export class QuizPlayComponent implements OnInit, OnDestroy {
  quiz: Quiz | null = null;
  preguntas: Question[] = [];
  loading = true;
  error = '';

  // Estado del juego
  currentIndex = 0;
  respuestas: { [key: string]: string } = {};  
  selectedAnswer = '';
  quizFinished = false;

  // Timer
  timeLeft = 0;
  timerInterval: any = null;
  totalTime = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private attemptService: AttemptService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const quizId = Number(this.route.snapshot.paramMap.get('id'));
    if (quizId) {
      this.loadQuiz(quizId);
    }
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  loadQuiz(id: number): void {
    console.log('🔍 Cargando quiz ID:', id);
    
    this.quizService.getQuiz(id).subscribe({
      next: (response) => {
        console.log(' Respuesta quiz:', response);
        
        this.quiz = response.quiz;
        this.preguntas = response.questions || [];  // ← "questions" del backend

        if (this.preguntas.length > 0) {
          this.totalTime = this.preguntas.length * 30;
          this.timeLeft = this.totalTime;
          this.loading = false;
          
          console.log('Quiz cargado:', this.quiz?.titulo);
          console.log('Preguntas cargadas:', this.preguntas.length);
          console.log('Primera pregunta:', this.preguntas[0]?.texto_pregunta);
          
          this.cdr.detectChanges();
          this.startTimer();
        } else {
          this.error = 'Este quiz no tiene preguntas.';
          this.loading = false;
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error('Error al cargar quiz:', error);
        this.loading = false;
        this.error = 'Error al cargar el quiz';
        this.cdr.detectChanges();
      }
    });
  }

  //  TIMER 
  startTimer(): void {
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.finishQuiz();
      }
    }, 1000);
  }

  stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  getTimerDisplay(): string {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  get hasQuestions(): boolean {
    return this.preguntas && this.preguntas.length > 0;
  }

  getTimerProgress(): number {
    return (this.timeLeft / this.totalTime) * 100;
  }

  getTimerColor(): string {
    const percent = this.getTimerProgress();
    if (percent > 50) return 'primary';
    if (percent > 25) return 'accent';
    return 'warn';
  }

  // NAVEGACIÓN DE PREGUNTAS 
  get currentQuestion(): Question | null {
    return this.preguntas[this.currentIndex] || null;
  }

  get progress(): number {
    return ((this.currentIndex + 1) / this.preguntas.length) * 100;
  }

  selectAnswer(answer: string): void {
    this.selectedAnswer = answer;
  }

  nextQuestion(): void {
    if (!this.selectedAnswer || !this.currentQuestion) return;

    // Guardar la respuesta en formato objeto { "1": "a", "2": "b" }
    this.respuestas[this.currentQuestion.id.toString()] = this.selectedAnswer;
    
    console.log('Respuesta guardada:', {
      pregunta: this.currentQuestion.id,
      respuesta: this.selectedAnswer
    });

    // ¿Última pregunta?
    if (this.currentIndex >= this.preguntas.length - 1) {
      this.finishQuiz();
    } else {
      this.currentIndex++;
      this.selectedAnswer = '';
    }
  }

  //  FINALIZAR QUIZ
  finishQuiz(): void {
    if (this.quizFinished || !this.quiz) return;
    
    this.stopTimer();
    this.quizFinished = true;

    // Si quedan preguntas sin responder (por timeout), añadir vacías
    for (const pregunta of this.preguntas) {
      const questionId = pregunta.id.toString();
      if (!this.respuestas[questionId]) {
        this.respuestas[questionId] = '';
      }
    }

    // Enviar al backend
    const attempt = {
      quiz_id: this.quiz.id,
      respuestas: this.respuestas
    };

    console.log('Enviando attempt:', attempt);

    this.attemptService.submitAttempt(attempt).subscribe({
      next: (response) => {
        console.log('Respuesta attempt:', response);
        
        // Navegar a resultados pasando los datos
        this.router.navigate(['/results'], {
          state: { resultado: response.resultado }
        });
      },
      error: (error) => {
        console.error('Error al enviar attempt:', error);
        this.error = 'Error al enviar las respuestas';
        this.quizFinished = false; // Permitir reintentar
        this.cdr.detectChanges();
      }
    });
  }
}