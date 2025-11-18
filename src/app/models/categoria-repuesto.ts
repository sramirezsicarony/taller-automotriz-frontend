// src/app/models/categoria-repuesto.model.ts
import { Auditable } from './base';

export interface CategoriaRepuesto extends Auditable {
  idCategoria: number;
  categoria: string;
}

export interface CategoriaRepuestoCreatePayload {
  categoria: string;
}

// DTOs de estadísticas que devuelve el backend
export interface CategoriaRepuestoConteoDTO {
  idCategoria: number;
  nombreCategoria: string;
  cantidadRepuestos: number;
}

export interface CategoriaRepuestoInventarioDTO {
  idCategoria: number;
  nombreCategoria: string;
  stockTotal: number;
  valorTotal: number;
}
