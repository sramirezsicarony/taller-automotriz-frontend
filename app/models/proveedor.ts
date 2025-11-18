// src/app/models/proveedor.model.ts
import { Auditable } from './base';

export interface Proveedor extends Auditable {
  idProveedor: number;
  nombre: string;
  telefono: string;
  direccion: string;
}

/**
 * Para POST /api/proveedores
 */
export interface ProveedorCreatePayload {
  nombre: string;
  telefono: string;
  direccion: string;
}

/**
 * Para PUT /api/proveedores/{idProveedor}
 */
export interface ProveedorUpdatePayload {
  nombre: string;
  telefono: string;
  direccion: string;
}

// ========= DTOs de reportes (List<Object[]>) =========

// GET /api/proveedores/resumen-suministros
// [idProveedor, nombreProveedor, cantidadTotal, costoTotal]
export interface ProveedorResumenSuministrosReporte {
  idProveedor: number;
  nombreProveedor: string;
  cantidadTotal: number;
  costoTotal: number;
}

// GET /api/proveedores/costo-total?inicio=...&fin=...
// [idProveedor, nombreProveedor, costoTotal]
export interface ProveedorCostoTotalReporte {
  idProveedor: number;
  nombreProveedor: string;
  costoTotal: number;
}
