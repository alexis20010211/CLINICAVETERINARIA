import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitasService } from './service/citas.service';
import { MascotasService } from '../mascotas/services/mascotas.service';
import { Cita } from './model/cita';
import { Mascota } from '../mascotas/model/mascota';

@Component({
  selector: 'app-citas',
  standalone: true,
  templateUrl: './citas.html',
  styleUrls: ['./citas.css'],
  imports: [CommonModule, ReactiveFormsModule, NgIf, NgFor]
})
export class CitasComponent implements OnInit {

  citaForm!: FormGroup;
  citas: Cita[] = [];
  mascotas: Mascota[] = [];
  usuarioActual: any = null; // Usuario logueado

  constructor(
    private fb: FormBuilder,
    private citasService: CitasService,
    private mascotasService: MascotasService
  ) {}

  ngOnInit(): void {
    // ✅ Cargar usuario logueado desde localStorage
    const usuarioLogueado = localStorage.getItem('usuario');
    if (usuarioLogueado) {
      this.usuarioActual = JSON.parse(usuarioLogueado);
    }

    // ✅ Cargar datos iniciales
    this.mascotas = this.mascotasService.getMascotas();
    this.citas = this.citasService.getCitas();

    // ✅ Inicializar formulario reactivo
    this.citaForm = this.fb.group({
      mascotaId: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
    });
  }

  // ✅ Verifica si el usuario es administrador
  esAdmin(): boolean {
    return this.usuarioActual?.rol === 'admin';
  }

  // ✅ Registrar nueva cita (solo admin)
  agendarCita(): void {
    if (!this.esAdmin()) {
      alert('Solo el administrador puede agendar citas.');
      return;
    }

    if (this.citaForm.valid) {
      const nuevaCita: Omit<Cita, 'id'> = {
        ...this.citaForm.value,
        duenoId: this.usuarioActual.id
      };

      this.citasService.agregarCita(nuevaCita);
      this.citas = this.citasService.getCitas(); // Actualiza la lista
      this.citaForm.reset();
    } else {
      alert('Por favor completa correctamente el formulario.');
    }
  }

  // ✅ Eliminar cita (solo admin)
  eliminarCita(id: number): void {
    if (!this.esAdmin()) {
      alert('Solo el administrador puede eliminar citas.');
      return;
    }

    this.citasService.eliminarCita(id);
    this.citas = this.citasService.getCitas(); // Refresca lista
  }

  // ✅ Obtener nombre de mascota por id
  getMascotaNombre(id: number): string {
    const mascota = this.mascotas.find(m => m.id === id);
    return mascota ? mascota.nombre : 'Desconocida';
  }
}
