// src/app/models/mecanico.model.ts
import { Auditable } from './base';
import { Especialidad } from './especialidad';

export interface Mecanico extends Auditable {
  idMecanico: string;  // DNI
  experiencia: number; // Byte en Java, number en TS
  costoHora: number;   // BigDecimal en Java, number en TS
  especialidad: Especialidad;
}

export interface MecanicoCreatePayload {
  idMecanico: string;
  experiencia: number;
  costoHora: number;
  especialidad: { idEspecialidad: number };
}

// ===== DTOs para reportes basados en Object[] =====

// /api/mecanicos/horas-costo
// [idMecanico, experiencia, horasTotales, costoTotal]
export interface HorasCostoMecanicoResumen {
  idMecanico: string;
  experiencia: number;
  horasTotales: number;
  costoTotal: number;
}

// /api/mecanicos/horas-por-area
// [idMecanico, idAreaLaboral, nombreArea, horasTotales]
export interface HorasPorMecanicoAreaResumen {
  idMecanico: string;
  idAreaLaboral: number;
  nombreArea: string;
  horasTotales: number;
}
