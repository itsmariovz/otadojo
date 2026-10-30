import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RankingEntry } from '../../shared/models/attempt.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // RANKING GLOBAL
  getRankings(): Observable<{ success: boolean; ranking: RankingEntry[] }> {
    //                                            ^^^^^^^ SINGULAR (sin "s")
    return this.http.get<{ success: boolean; ranking: RankingEntry[] }>(`${this.apiUrl}/users/rankings`);
  }

  // PERFIL DE USUARIO
  getProfile(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`);
  }

  // HISTORIAL DE INTENTOS
  getHistory(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}/attempts`);
  }
}