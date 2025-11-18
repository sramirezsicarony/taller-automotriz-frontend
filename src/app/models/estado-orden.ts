// src/app/models/estado-orden.model.ts
import { Auditable } from './base';

export interface EstadoOrden extends Auditable {
  idEstadoOrden: number;   // en backend es Byte, en TS usamos number
  estado: string;
}

export interface EstadoOrdenCreatePayload {
  estado: string;
}

// ===== DTOs de estadísticas =====

// Para /api/estados-orden/estadisticas/ordenes-por-estado
export interface OrdenesPorEstadoEstadistica {
  idEstadoOrden: number;
  nombreEstado: string;
  cantidadOrdenes: number;
}

// Para /api/estados-orden/estadisticas/promedio-dias
// y /api/estados-orden/estadisticas/promedio-dias-rango
export interface PromedioDiasPorEstadoEstadistica {
  idEstadoOrden: number;
  nombreEstado: string;
  promedioDias: number;
}
