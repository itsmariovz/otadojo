export interface User {
  id: number;
  username: string;
  email: string;
  rol: 'user' | 'admin';  // ← "rol" en español
  created_at?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  usuario?: User;
}