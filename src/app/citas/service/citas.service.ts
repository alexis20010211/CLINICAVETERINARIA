// src/app/services/citas.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private citas: any[] = [];
  private nextId = 1;

  constructor() {}

  getCitas() {
    return this.citas;
  }

  agregarCita(cita: any) {
    cita.id = this.nextId++;
    this.citas.push(cita);
  }

  eliminarCita(id: number) {
    this.citas = this.citas.filter(c => c.id !== id);
  }
}
