// src/app/models/bodega.model.ts
import { Auditable } from './base';
import { Almacen } from './almacen';
import { Repuesto } from './repuesto';

export interface Bodega extends Auditable {
  almacen: Almacen;
  repuesto: Repuesto;
  stock: number;
  precioVenta: number; // BigDecimal en backend -> number en frontend
}

/**
 * Para POST /api/bodega
 * El backend arma el BodegaId usando almacen.idAlmacen y repuesto.idRepuesto
 */
export interface BodegaCreatePayload {
  almacen: { idAlmacen: number };
  repuesto: { idRepuesto: number };
  stock: number;
  precioVenta: number;
}

/**
 * Para PUT /api/bodega/{idAlmacen}/{idRepuesto}
 * Solo se actualizan los campos de datos, no las claves.
 */
export interface BodegaUpdatePayload {
  stock: number;
  precioVenta: number;
}

// ========= DTOs de reportes (según BodegaController) =========

export interface BodegaStockPorAlmacenReporte {
  idAlmacen: number;
  nombreAlmacen: string;
  stockTotal: number;
  valorTotal: number;
}

export interface BodegaStockPorRepuestoReporte {
  idRepuesto: number;
  nombreRepuesto: string;
  stockTotal: number;
  valorTotal: number;
}

export interface BodegaRepuestoStockBajoReporte {
  idRepuesto: number;
  nombreRepuesto: string;
  stockTotal: number;
}
