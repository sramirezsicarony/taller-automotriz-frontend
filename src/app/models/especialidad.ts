// src/app/models/especialidad.model.ts
import { Auditable } from './base';

export interface Especialidad extends Auditable {
  idEspecialidad: number;
  nombreEspecialidad: string;
  descripcion?: string;
}

export interface EspecialidadCreatePayload {
  nombreEspecialidad: string;
  descripcion?: string;
}

// ===== DTOs de estadísticas que devuelve el backend =====

// Para /api/especialidades/estadisticas/mecanicos-por-especialidad
export interface MecanicosPorEspecialidadEstadistica {
  idEspecialidad: number;
  nombreEspecialidad: string;
  cantidadMecanicos: number;
}

// Para /api/especialidades/estadisticas/costo-mano-obra
export interface CostoManoObraPorEspecialidadEstadistica {
  idEspecialidad: number;
  nombreEspecialidad: string;
  costoTotalManoObra: number;
}
