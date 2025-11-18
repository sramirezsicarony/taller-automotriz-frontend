// src/app/models/suministra.model.ts
import { Auditable } from './base';
import { Proveedor } from './proveedor';
import { Repuesto } from './repuesto';

export interface Suministra extends Auditable {
  proveedor: Proveedor;
  repuesto: Repuesto;
  costoUnitario: number;
  cantidad: number;
  costoTotal: number;
  fechaIngreso: string; // 'YYYY-MM-DD'
}

/**
 * Para crear un suministro (POST /api/suministros).
 * Lo normal será transformar esto en el body esperado por el backend:
 * {
 *   proveedor: { idProveedor },
 *   repuesto: { idRepuesto },
 *   ...
 * }
 * desde el service o el componente.
 */
export interface SuministraCreatePayload {
  idProveedor: number;
  idRepuesto: number;
  costoUnitario: number;
  cantidad: number;
  costoTotal: number;
  fechaIngreso: string; // 'YYYY-MM-DD'
}

/**
 * Para actualizar un suministro (PUT /api/suministros/{idProveedor}/{idRepuesto})
 * Las PK no cambian, solo datos.
 */
export interface SuministraUpdatePayload {
  costoUnitario: number;
  cantidad: number;
  costoTotal: number;
  fechaIngreso: string; // 'YYYY-MM-DD'
}

// ========== DTOs de reportes / estadísticas ==========

// GET /api/suministros/estadisticas/compras-por-proveedor
// [idProveedor, nombreProveedor, cantidadTotal, costoTotal]
export interface SuministraResumenComprasProveedorReporte {
  idProveedor: number;
  nombreProveedor: string;
  cantidadTotal: number;
  costoTotal: number;
}

// GET /api/suministros/estadisticas/compras-por-repuesto
// [idRepuesto, nombreRepuesto, cantidadTotal, costoTotal]
export interface SuministraResumenComprasRepuestoReporte {
  idRepuesto: number;
  nombreRepuesto: string;
  cantidadTotal: number;
  costoTotal: number;
}

// GET /api/suministros/estadisticas/compras-por-proveedor-rango
// [idProveedor, nombreProveedor, cantidadTotal, costoTotal]
export interface SuministraComprasProveedorRangoReporte {
  idProveedor: number;
  nombreProveedor: string;
  cantidadTotal: number;
  costoTotal: number;
}
