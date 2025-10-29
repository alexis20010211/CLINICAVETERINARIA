export interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza?: string;
  edad?: number;
  propietario?: string;
  nombreDueno?: string;     // ✅ agrega este campo
  telefonoDueno?: string;   // ✅ agrega este campo
   duenoId: number; // <-- ID del usuario dueño de la mascota
}
