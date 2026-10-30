export interface AttemptRequest {
  quiz_id: number;
  respuestas: { [key: string]: string };
}

export interface AttemptResponse {
  success: boolean;
  message: string;
  resultado: {
    attemptId: number;
    puntos: number;
    correctas: number;
    total: number;
    porcentaje: number;
  };
}

export interface RankingEntry {
  id: number;
  username: string;
  puntos_totales: string | number;  // ← Puede ser string o number
  quizzes_jugados: number;
}