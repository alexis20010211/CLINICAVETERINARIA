import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MascotasService } from './services/mascotas.service';
import { Mascota } from './model/mascota';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './mascotas.html',   // Renombrado para seguir convenciones Angular
  styleUrls: ['./mascotas.css']     // Renombrado para seguir convenciones Angular
})
export class MascotasComponent {

  mascotaForm: FormGroup;
  mascotas: Mascota[] = [];

  constructor(
    private fb: FormBuilder,
    private mascotasService: MascotasService
  ) {
    this.mascotaForm = this.fb.group({
      nombre: ['', Validators.required],
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      edad: [0, [Validators.required, Validators.min(0)]],
      nombreDueno: ['', Validators.required],
      telefonoDueno: ['', Validators.required]
    });

    this.cargarMascotas();
  }

  cargarMascotas(): void {
    this.mascotas = this.mascotasService.getMascotas();
  }

  registrar(): void {   // Función renombrada para coincidir con el HTML
    if (this.mascotaForm.valid) {
      this.mascotasService.agregarMascota(this.mascotaForm.value);
      this.cargarMascotas();
      this.mascotaForm.reset();
    }
  }
}
