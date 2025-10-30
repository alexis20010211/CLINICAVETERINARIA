import { Cita } from '../citas/model/cita';

export const citas: Cita[] = [
  {
    id: 1,
    mascotaId: 1,
    fecha: '2025-10-30',
    hora: '10:00',
    motivo: 'Vacuna',
    veterinario: 'Dr. Juan',
    observaciones: 'Traer cartilla de vacunación',
    proxima: true,
    duenoId: 1
  },
  {
    id: 2,
    mascotaId: 2,
    fecha: '2025-10-31',
    hora: '11:30',
    motivo: 'Consulta general',
    veterinario: 'Dra. Ana',
    proxima: false,
    duenoId: 2
  },
  {
    id: 3,
    mascotaId: 3,
    fecha: '2025-11-01',
    hora: '09:00',
    motivo: 'Desparasitación',
    veterinario: 'Dr. Carlos',
    observaciones: 'Confirmar tipo de desparasitación',
    proxima: true,
    duenoId: 3
  },
  {
    id: 4,
    mascotaId: 1,
    fecha: '2025-11-05',
    hora: '14:00',
    motivo: 'Chequeo anual',
    veterinario: 'Dra. Ana',
    proxima: false,
    duenoId: 1
  }
];
