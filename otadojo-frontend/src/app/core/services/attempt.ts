import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AttemptRequest, AttemptResponse } from '../../shared/models/attempt.model';

@Injectable({
  providedIn: 'root'
})
export class AttemptService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //ENVIAR RESPUESTAS DE UN QUIZ 
  submitAttempt(attempt: AttemptRequest): Observable<AttemptResponse> {
    return this.http.post<AttemptResponse>(`${this.apiUrl}/attempts`, attempt);
  }
}