import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './results.html',
  styleUrl: './results.scss'
})
export class ResultsComponent implements OnInit {
  resultado: any = null;
  error = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Recibir datos del state
    const state = history.state;
    
    console.log('📊 State recibido:', state);

    if (state && state.resultado) {
      this.resultado = state.resultado;
      console.log('✅ Resultado:', this.resultado);
    } else {
      console.error('❌ No se recibió resultado');
      this.error = true;
    }
  }

  get puntos(): number {
    return this.resultado?.puntos || 0;  // ← CAMBIO AQUÍ
  }

  get correctas(): number {
    return this.resultado?.correctas || 0;  // ← CAMBIO AQUÍ
  }

  get total(): number {
    return this.resultado?.total || 0;  // ← CAMBIO AQUÍ
  }

  get porcentaje(): number {
    return this.resultado?.porcentaje || 0;  // ← CAMBIO AQUÍ
  }

  getEmoji(): string {
    if (this.porcentaje >= 80) return '🏆';
    if (this.porcentaje >= 60) return '😄';
    if (this.porcentaje >= 40) return '😅';
    return '😢';
  }

  getMessage(): string {
    if (this.porcentaje >= 80) return '¡Increíble! Eres un verdadero otaku';
    if (this.porcentaje >= 60) return '¡Bien hecho! Sabes bastante';
    if (this.porcentaje >= 40) return 'No está mal, pero puedes mejorar';
    return 'Necesitas ver más anime...';
  }

  getColor(): string {
    if (this.porcentaje >= 80) return '#4caf50';  // Verde
    if (this.porcentaje >= 60) return '#2196f3';  // Azul
    if (this.porcentaje >= 40) return '#ff9800';  // Naranja
    return '#f44336';  // Rojo
  }
}