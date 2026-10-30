import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Quiz, Question, Categoria } from '../../shared/models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getQuizzes(categoria?: Categoria): Observable<{ success: boolean; quizzes: Quiz[] }> {
    let params = new HttpParams();
    if (categoria) params = params.set('categoria', categoria);
    return this.http.get<{ success: boolean; quizzes: Quiz[] }>(`${this.apiUrl}/quizzes`, { params });
  }

  getQuiz(id: number): Observable<{ success: boolean; quiz: Quiz; questions: Question[] }> {
    return this.http.get<{ success: boolean; quiz: Quiz; questions: Question[] }>(`${this.apiUrl}/quizzes/${id}`);
  }

  createQuiz(quiz: { titulo: string; descripcion: string; dificultad: string; categoria: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/quizzes`, quiz);
  }

  createQuestion(question: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/quizzes/questions`, question);
  }
}
