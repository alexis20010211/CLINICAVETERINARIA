export interface Cita {
  id: number;
  mascotaId: number;
  fecha: string;        // Fecha de la cita
  hora: string;         // ⏰ Hora específica de la cita
  motivo: string;
  veterinario: string;
  observaciones?: string;
  proxima?: boolean;    // Para resaltar citas próximas
   duenoId: number; // <-- ID del usuario dueño de la mascota
}
