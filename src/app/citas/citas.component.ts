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
  imports: [CommonModule, ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './citas.html',
  styleUrls: ['./citas.css']
})
export class CitasComponent implements OnInit {
  citaForm!: FormGroup;
  citas: Cita[] = [];
  mascotas: Mascota[] = [];
  usuarioActual: any = null; // ✅ Usuario logueado

  constructor(
    private fb: FormBuilder,
    private citasService: CitasService,
    private mascotasService: MascotasService
  ) {}

  ngOnInit(): void {
    // Cargar usuario desde localStorage
    const usuarioLogueado = localStorage.getItem('usuario');
    if (usuarioLogueado) this.usuarioActual = JSON.parse(usuarioLogueado);

    // Obtener mascotas y citas
    this.mascotas = this.mascotasService.getMascotas();
    this.citas = this.citasService.getCitas();

    // Inicializar formulario
    this.citaForm = this.fb.group({
      mascotaId: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  esAdmin(): boolean {
    return this.usuarioActual && this.usuarioActual.rol === 'admin';
  }

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
      this.citas = this.citasService.getCitas();
      this.citaForm.reset();
    }
  }

  eliminarCita(id: number): void {
    if (!this.esAdmin()) {
      alert('Solo el administrador puede eliminar citas.');
      return;
    }
    this.citasService.eliminarCita(id);
    this.citas = this.citasService.getCitas();
  }

  getMascotaNombre(id: number): string {
    const mascota = this.mascotas.find(m => m.id === id);
    return mascota ? mascota.nombre : 'Desconocida';
  }
}
