import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgForOf, NgIf } from '@angular/common';
import { MascotasService } from '../mascotas/services/mascotas.service';
import { CitasService } from '../citas/service/citas.service';
import { Mascota } from '../mascotas/model/mascota';
import { Cita } from '../citas/model/cita';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [
    CommonModule,
    NgForOf,   // Para *ngFor
    NgIf,      // Para *ngIf y ngIfElse
    DatePipe
  ],
  templateUrl: './historial.html',
  styleUrls: ['./historial.css']
})
export class HistorialComponent implements OnInit {

  mascotas: Mascota[] = [];
  citas: Cita[] = [];
  historial: Cita[] = [];
  selectedMascota: Mascota | null = null;
  usuarioActual: any = null;

  constructor(
    private mascotasService: MascotasService,
    private citasService: CitasService
  ) {}

  ngOnInit(): void {
    const usuarioLogueado = localStorage.getItem('usuario');
    if (usuarioLogueado) {
      this.usuarioActual = JSON.parse(usuarioLogueado);
    }

    this.cargarDatos();
  }

  cargarDatos(): void {
    if (this.usuarioActual?.rol === 'admin') {
      this.mascotas = this.mascotasService.getMascotas();
      this.citas = this.citasService.getCitas();
    } else {
      // Cliente solo ve sus mascotas
      this.mascotas = this.mascotasService.getMascotas().filter(m => m.duenoId === this.usuarioActual.id);
      this.citas = this.citasService.getCitas().filter(c => c.duenoId === this.usuarioActual.id);
    }
  }

  verHistorial(idMascota: number): void {
    const mascotaSeleccionada = this.mascotas.find(m => m.id === idMascota);
    if (mascotaSeleccionada) {
      this.selectedMascota = mascotaSeleccionada;
      this.historial = this.citas.filter(c => c.mascotaId === idMascota)
        .map(cita => ({
          ...cita,
          proxima: new Date(cita.fecha) >= new Date()
        }));
    }
  }

  esAdmin(): boolean {
    return this.usuarioActual?.rol === 'admin';
  }
}
