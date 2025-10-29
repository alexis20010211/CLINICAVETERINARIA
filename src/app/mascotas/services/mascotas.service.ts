import { Injectable } from '@angular/core';
import { Mascota } from '../model/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  private mascotas: Mascota[] = [];

  constructor() { }

  getMascotas(): Mascota[] {
    return this.mascotas;
  }

  agregarMascota(mascota: Mascota): void {
    mascota.id = this.mascotas.length + 1;
    this.mascotas.push(mascota);
  }

  eliminarMascota(id: number): void {
    this.mascotas = this.mascotas.filter(m => m.id !== id);
  }

  actualizarMascota(mascotaActualizada: Mascota): void {
    const index = this.mascotas.findIndex(m => m.id === mascotaActualizada.id);
    if (index !== -1) {
      this.mascotas[index] = mascotaActualizada;
    }
  }
}
