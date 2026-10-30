import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { QuizService } from '../../../core/services/quiz';

@Component({
  selector: 'app-create-questions',
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
    MatSnackBarModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './create-questions.html',
  styleUrl: './create-questions.scss'
})
export class CreateQuestionsComponent implements OnInit {
  questionForm: FormGroup;
  quizId: number = 0;
  loading = false;
  questionsAdded: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.questionForm = this.fb.group({
      texto_pregunta: ['', [Validators.required, Validators.minLength(10)]],
      opcion_a: ['', [Validators.required]],
      opcion_b: ['', [Validators.required]],
      opcion_c: ['', [Validators.required]],
      opcion_d: ['', [Validators.required]],
      respuesta_correcta: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // ✅ CORRECCIÓN: Usar 'quizId' como está en las rutas
    const quizIdParam = this.route.snapshot.paramMap.get('quizId');
    
    console.log('📋 Parámetro quizId:', quizIdParam);
    
    if (quizIdParam) {
      this.quizId = Number(quizIdParam);
      console.log('✅ Quiz ID establecido:', this.quizId);
    } else {
      console.error('❌ No se encontró el parámetro quizId');
      this.snackBar.open('Error: No se encontró el ID del quiz', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/admin']);
    }
  }

  onSubmit(): void {
    if (this.questionForm.invalid) {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.questionForm.controls).forEach(key => {
        this.questionForm.get(key)?.markAsTouched();
      });
      
      this.snackBar.open('Por favor completa todos los campos correctamente', 'Cerrar', { duration: 2000 });
      return;
    }

    this.loading = true;

    const questionData = {
      quiz_id: this.quizId,
      texto_pregunta: this.questionForm.value.texto_pregunta,
      opcion_a: this.questionForm.value.opcion_a,
      opcion_b: this.questionForm.value.opcion_b,
      opcion_c: this.questionForm.value.opcion_c,
      opcion_d: this.questionForm.value.opcion_d,
      respuesta_correcta: this.questionForm.value.respuesta_correcta
    };

    console.log('📤 Enviando pregunta:', questionData);

    this.quizService.createQuestion(questionData).subscribe({
      next: (response) => {
        console.log('✅ Respuesta del servidor:', response);
        
        this.loading = false;
        
        // Añadir a la lista local
        this.questionsAdded.push({
          ...questionData,
          id: response.questionId || this.questionsAdded.length + 1
        });
        
        this.snackBar.open('¡Pregunta añadida correctamente!', 'Cerrar', { duration: 2000 });
        
        // Resetear formulario
        this.questionForm.reset();
        
        // Forzar detección de cambios
        setTimeout(() => {
          this.cdr.detectChanges();
        }, 0);
      },
      error: (error) => {
        console.error('❌ Error completo:', error);
        console.error('❌ Error response:', error.error);
        
        this.loading = false;
        
        const mensaje = error.error?.message || error.message || 'Error al crear la pregunta';
        this.snackBar.open(mensaje, 'Cerrar', { duration: 3000 });
        
        this.cdr.detectChanges();
      }
    });
  }

  finish(): void {
    if (this.questionsAdded.length === 0) {
      this.snackBar.open('Debes añadir al menos una pregunta antes de finalizar', 'Cerrar', { duration: 3000 });
      return;
    }

    this.snackBar.open(
      `¡Quiz completado exitosamente con ${this.questionsAdded.length} pregunta(s)!`, 
      'Cerrar', 
      { duration: 3000 }
    );
    
    setTimeout(() => {
      this.router.navigate(['/admin']);
    }, 1500);
  }
}
