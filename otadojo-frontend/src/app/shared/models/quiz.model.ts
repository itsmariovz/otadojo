export type Dificultad = 'facil' | 'medio' | 'dificil';
export type Categoria = 'anime-clasico' | 'anime-moderno' | 'videojuegos';

export interface Quiz {
  id: number;
  titulo: string;
  descripcion: string;
  dificultad: Dificultad;
  categoria: Categoria;
  num_preguntas?: number;
  imagen_portada?: string;
  created_at?: string;
}

export interface Question {
  id: number;
  quiz_id: number;
  texto_pregunta: string;
  opcion_a: string;
  opcion_b: string;
  opcion_c: string;
  opcion_d: string;
  puntos_base?: number;
  respuesta_correcta?: string;
}

export const CATEGORIA_LABEL: Record<Categoria, string> = {
  'anime-clasico': 'Anime Clásico',
  'anime-moderno': 'Anime Moderno',
  'videojuegos': 'Videojuegos'
};

export const PUNTOS_DIFICULTAD: Record<Dificultad, number> = {
  facil: 100,
  medio: 200,
  dificil: 300
};
