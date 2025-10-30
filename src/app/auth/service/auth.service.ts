import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor() { }

  // Simula el login guardando token y rol
  login(token: string, role: 'admin' | 'cliente') {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // true si hay token
  }

  getRole(): 'admin' | 'cliente' | null {
    return localStorage.getItem('role') as 'admin' | 'cliente' | null;
  }
}
