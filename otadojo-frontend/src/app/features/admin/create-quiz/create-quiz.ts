import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { QuizService } from '../../../core/services/quiz';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './create-quiz.html',
  styleUrl: './create-quiz.scss'
})
export class CreateQuizComponent {
  quizForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.quizForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      dificultad: ['', [Validators.required]],
      categoria: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.quizForm.invalid) return;

    this.loading = true;

    this.quizService.createQuiz(this.quizForm.value).subscribe({
      next: (response) => {
        this.loading = false;
        this.snackBar.open('¡Quiz creado correctamente!', 'Cerrar', { duration: 3000 });
        const quizId = response.quiz?.id || response.quizId;
        if (quizId) {
          this.router.navigate(['/admin/create-questions', quizId]);
        } else {
          this.router.navigate(['/admin']);
        }
      },
      error: (error) => {
        this.loading = false;
        const mensaje = error.error?.message || 'Error al crear el quiz';
        this.snackBar.open(mensaje, 'Cerrar', { duration: 3000 });
      }
    });
  }
}
