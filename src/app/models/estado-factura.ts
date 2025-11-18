// src/app/models/estado-factura.model.ts
import { Auditable } from './base';

export interface EstadoFactura extends Auditable {
  idEstadoFactura: number;
  estado: string;
}

// Para crear (POST): solo se envía el nombre del estado
export interface EstadoFacturaCreatePayload {
  estado: string;
}

// Para actualizar (PUT): igual, solo cambia el nombre
export interface EstadoFacturaUpdatePayload {
  estado: string;
}

// ========== DTOs de reportes / estadísticas ==========

// Coincide con FacturasPorEstadoDTO
export interface FacturasPorEstadoReporte {
  idEstadoFactura: number;
  nombreEstado: string;
  cantidadFacturas: number;
}

// Coincide con TotalFacturadoPorEstadoDTO
export interface TotalFacturadoPorEstadoReporte {
  idEstadoFactura: number;
  nombreEstado: string;
  totalFacturado: number;
}
