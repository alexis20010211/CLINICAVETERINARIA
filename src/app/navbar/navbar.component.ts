import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule], // CommonModule incluye NgIf/NgFor
  template: `
    <nav class="navbar">
      <!-- Logo -->
      <div class="nav-logo">
        <img src="assets/images/logo.png" alt="Clínica Veterinaria" class="logo-img"/>
    <span>VetClinic</span>
      </div>

      <!-- Links principales -->
      <ul class="nav-links">
        <li><a routerLink="/" routerLinkActive="active">Inicio</a></li>
        <li><a routerLink="/dashboard/promos" routerLinkActive="active">Promos</a></li>
        <li><a routerLink="/dashboard/servicios" routerLinkActive="active">Servicios</a></li>
        <li><a routerLink="/dashboard/equipo" routerLinkActive="active">Equipo</a></li>
        <li><a routerLink="/dashboard/contacto" routerLinkActive="active">Contacto</a></li>
        <li *ngIf="esAdmin()"><a routerLink="/dashboard/usuarios" routerLinkActive="active">Usuarios</a></li>
      </ul>

      <!-- Login / Logout -->
      <div class="nav-actions">
        <button *ngIf="!isLoggedIn()" (click)="login()">Login</button>
        <button *ngIf="isLoggedIn()" (click)="logout()">Cerrar sesión</button>
      </div>
    </nav>
  `,
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  constructor(private router: Router) {}

  esAdmin(): boolean {
    return localStorage.getItem('rol') === 'admin';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['/login']);
  }

  login() {
    this.router.navigate(['/login']);
  }
}
