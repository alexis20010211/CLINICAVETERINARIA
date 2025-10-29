import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <h1>Bienvenido, {{ usuario?.nombre }}</h1>
    <p>Rol: {{ usuario?.rol }}</p>

    <nav>
      <a routerLink="mascotas">Mascotas</a> |
      <a routerLink="citas">Citas</a> |
      <a routerLink="historial">Historial</a> |
      <a routerLink="ingresos" *ngIf="usuario?.rol === 'admin'">Ingresos</a> |
      <a routerLink="usuarios" *ngIf="usuario?.rol === 'admin'">Usuarios</a>
    </nav>

    <router-outlet></router-outlet>
  `,
})
export class DashboardComponent implements OnInit {
  usuario: any = null;

  ngOnInit(): void {
    const usuarioStr = localStorage.getItem('usuario');
    if (usuarioStr) this.usuario = JSON.parse(usuarioStr);
  }
}
