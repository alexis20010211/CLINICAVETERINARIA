import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MascotasService } from './services/mascotas.service';
import { Mascota } from './model/mascota';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './mascotas.html',
  styleUrls: ['./mascotas.css']
})
export class MascotasComponent implements OnInit {

  mascotaForm!: FormGroup;
  mascotas: Mascota[] = [];
  usuarioActual: any = null; // ✅ Para guardar el usuario logueado

  constructor(
    private fb: FormBuilder,
    private mascotasService: MascotasService
  ) {}

  ngOnInit(): void {
    // ✅ Inicializar formulario
    this.mascotaForm = this.fb.group({
      nombre: ['', Validators.required],
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      edad: [0, [Validators.required, Validators.min(0)]],
      nombreDueno: ['', Validators.required],
      telefonoDueno: ['', Validators.required]
    });

    // ✅ Cargar usuario logueado desde localStorage
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado) {
      this.usuarioActual = JSON.parse(usuarioLogueado);
    }

    // ✅ Cargar mascotas
    this.cargarMascotas();
  }

  cargarMascotas(): void {
    this.mascotas = this.mascotasService.getMascotas();
  }

  registrar(): void {
    if (!this.usuarioActual || this.usuarioActual.rol !== 'admin') {
      alert('Solo el administrador puede registrar mascotas');
      return;
    }

    if (this.mascotaForm.valid) {
      this.mascotasService.agregarMascota(this.mascotaForm.value);
      this.cargarMascotas();
      this.mascotaForm.reset();
    }
  }

  eliminarMascota(id: number): void {
    if (!this.usuarioActual || this.usuarioActual.rol !== 'admin') {
      alert('Solo el administrador puede eliminar mascotas');
      return;
    }

    this.mascotasService.eliminarMascota(id);
    this.cargarMascotas();
  }

  // ✅ Mostrar si el usuario actual es admin
  esAdmin(): boolean {
    return this.usuarioActual && this.usuarioActual.rol === 'admin';
  }
}
