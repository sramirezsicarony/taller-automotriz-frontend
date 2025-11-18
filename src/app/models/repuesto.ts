// src/app/models/repuesto.model.ts
import { Auditable } from './base';
import { CategoriaRepuesto } from './categoria-repuesto';

export interface Repuesto extends Auditable {
  idRepuesto: number;
  nombre: string;
  descripcion?: string;
  categoria: CategoriaRepuesto;                 // ← coincide con JPA
}

export interface RepuestoCreatePayload {
  nombre: string;
  descripcion?: string;
  categoria: { idCategoria: number };           // ← FK a CategoriaRepuesto
}

export interface RepuestoStockValorReporte {
  idRepuesto: number;
  nombreRepuesto: string;
  stockTotal: number;
  valorTotal: number;
}

export interface RepuestoVentasReporte {
  idRepuesto: number;
  nombreRepuesto: string;
  cantidadTotal: number;
  totalVendido: number;
}

export interface RepuestoComprasReporte {
  idRepuesto: number;
  nombreRepuesto: string;
  cantidadComprada: number;
  costoTotalCompras: number;
}
