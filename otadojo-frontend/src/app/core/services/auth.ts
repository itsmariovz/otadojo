import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  // BehaviorSubject para saber en todo momento si hay usuario logueado
  private currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    console.log('AuthService inicializado');
    console.log('Usuario inicial:', this.currentUserSubject.value);
  }

  // LOGIN 
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          console.log('LOGIN SERVICE RESPONSE:', response);

          if (response?.token) {
            console.log('Token recibido');
            localStorage.setItem('token', response.token);

            if (response.usuario) {
              console.log('Usuario recibido:', response.usuario);
              
              // VERIFICAR QUE TENGA ID
              if (!response.usuario.id) {
                console.error('CRÍTICO: El usuario NO tiene ID!');
              } else {
                console.log('Usuario tiene ID:', response.usuario.id);
              }
              
              localStorage.setItem('user', JSON.stringify(response.usuario));
              this.currentUserSubject.next(response.usuario);
              
              console.log('Usuario guardado en localStorage');
              console.log('currentUserSubject actualizado');
              
              // VERIFICAR QUE SE GUARDÓ BIEN
              const verificacion = localStorage.getItem('user');
              console.log('Verificación - User en localStorage:', verificacion);
              
            } else {
              console.error('No hay usuario en la respuesta');
            }
          } else {
            console.error('No hay token en la respuesta');
          }
        })
      );
  }

  // REGISTER 
  register(datos: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, datos);
  }

  // LOGOUT 
  logout(): void {
    console.log('Haciendo logout...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    console.log('Logout completado');
  }

  // HELPERS
  getToken(): string | null {
    const token = localStorage.getItem('token');
    console.log('getToken():', token ? 'Token existe' : 'No hay token');
    return token;
  }

  isLoggedIn(): boolean {
    const loggedIn = !!this.getToken();
    console.log('isLoggedIn():', loggedIn);
    return loggedIn;
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    const admin = user?.rol === 'admin';
    console.log('isAdmin():', admin, 'User:', user);
    return admin;
  }

  getCurrentUser(): User | null {
    const user = this.currentUserSubject.value;
    console.log('getCurrentUser():', user);
    return user;
  }

  private getStoredUser(): User | null {
    console.log('getStoredUser() - Leyendo localStorage...');
    
    const userStr = localStorage.getItem('user');
    console.log('User string en localStorage:', userStr);
    
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        console.log('User parseado correctamente:', user);
        
        if (!user.id) {
          console.error('El user parseado NO tiene ID!');
        }
        
        return user;
      } catch (e) {
        console.error('Error al parsear user:', e);
        return null;
      }
    }
    
    console.log('No hay user en localStorage');
    return null;
  }
}