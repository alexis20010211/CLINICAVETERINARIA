export interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  nombreDueno: string;   // NOTA: antes era "dueno"
  telefonoDueno: string;
}
