import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Usuario {
  nombre: string;
  rol: 'admin' | 'cliente';
}

interface Resumen {
  mascotas: number;
  citasHoy: number;
  ingresosMes: number; // en PEN
  usuarios: number;
}

interface SeccionAdmin {
  nombre: string;
  ruta: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  usuario: Usuario | null = null;

  resumen: Resumen = {
    mascotas: 0,
    citasHoy: 0,
    ingresosMes: 0,
    usuarios: 0
  };

  seccionesAdmin: SeccionAdmin[] = [
    { nombre: 'Ingresos', ruta: 'ingresos' },
    { nombre: 'Usuarios', ruta: 'usuarios' }
  ];

  ngOnInit(): void {
    const usuarioStr = localStorage.getItem('usuario');
    if (usuarioStr) {
      this.usuario = JSON.parse(usuarioStr) as Usuario;
    }

    // Datos de ejemplo; en un proyecto real vendrían del backend
    this.resumen = {
      mascotas: 32,
      citasHoy: 5,
      ingresosMes: 2450,
      usuarios: 15
    };
  }

  // Verifica si el usuario es administrador
  esAdmin(): boolean {
    return this.usuario?.rol === 'admin';
  }

  // Maneja los botones de "Ver detalles"
  verDetalle(tipo: keyof Resumen) {
    switch (tipo) {
      case 'mascotas':
        console.log('Detalle de mascotas:', this.resumen.mascotas);
        break;
      case 'citasHoy':
        console.log('Detalle de citas hoy:', this.resumen.citasHoy);
        break;
      case 'ingresosMes':
        console.log('Detalle de ingresos mes:', this.resumen.ingresosMes, 'PEN');
        break;
      case 'usuarios':
        console.log('Detalle de usuarios:', this.resumen.usuarios);
        break;
      default:
        console.warn('Tipo de detalle no reconocido:', tipo);
    }
  }
}
