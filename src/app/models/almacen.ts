// src/app/models/almacen.model.ts
import { Auditable } from './base';

export interface Almacen extends Auditable {
  idAlmacen: number;
  nombre: string;
  direccion: string;
}

export interface AlmacenCreatePayload {
  nombre: string;
  direccion: string;
}

// ===== DTOs de reportes según el Controller =====

export interface AlmacenResumenReporte {
  idAlmacen: number;
  nombreAlmacen: string;
  cantidadRepuestos: number;
  stockTotal: number;
}

export interface AlmacenInventarioReporte {
  idAlmacen: number;
  nombreAlmacen: string;
  stockTotal: number;
  valorTotal: number;
}
