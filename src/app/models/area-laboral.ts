// src/app/models/area-laboral.model.ts
import { Auditable } from './base';

export interface AreaLaboral extends Auditable {
  idAreaLaboral: number;
  area: string;
}

export interface AreaLaboralCreatePayload {
  area: string;
}

// ===== DTOs de estadísticas que devuelve el backend =====

// Para /api/areas-laborales/estadisticas/mecanicos-por-area
export interface AreaLaboralMecanicosEstadistica {
  idAreaLaboral: number;
  nombreArea: string;
  cantidadMecanicos: number;
}

// Para /api/areas-laborales/estadisticas/horas-por-area
export interface AreaLaboralHorasEstadistica {
  idAreaLaboral: number;
  nombreArea: string;
  horasTotales: number;
}
