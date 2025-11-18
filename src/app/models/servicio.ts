// src/app/models/servicio.model.ts
import { Auditable } from './base';

export interface Servicio extends Auditable {
  idServicio: number;
  servicio: string;
  descripcion?: string;
}

export interface ServicioCreatePayload {
  servicio: string;
  descripcion?: string;
}

// ===== DTOs de estadísticas =====

// Para /api/servicios/estadisticas/ejecuciones
export interface ServicioEjecucionesEstadistica {
  idServicio: number;
  nombreServicio: string;
  cantidadEjecuciones: number;
}

// Para /api/servicios/estadisticas/uso
export interface UsoServicioEstadistica {
  idServicio: number;
  nombreServicio: string;
  ejecuciones: number;
  vehiculosDistintos: number;
}
