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
}
