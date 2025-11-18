// src/app/models/cliente.model.ts
import { Auditable } from './base';

export interface Cliente extends Auditable {
  idCliente: string;   // DNI
  nombre: string;
  telefono: string;
  correo: string;
}

export interface ClienteCreatePayload {
  idCliente: string;   // DNI (no es autogenerado en la BD)
  nombre: string;
  telefono: string;
  correo: string;
}

// ==== OPCIONALES: para mapear los reportes ====

// /api/clientes/vehiculos  → [idCliente, nombreCliente, cantidadVehiculos]
export interface ClienteVehiculosResumen {
  idCliente: string;
  nombreCliente: string;
  cantidadVehiculos: number;
}

// /api/clientes/resumen-facturacion  →
// [idCliente, nombreCliente, totalFacturado, manoObraTotal, repuestosTotal, impuestoTotal]
export interface ClienteFacturacionResumen {
  idCliente: string;
  nombreCliente: string;
  totalFacturado: number;
  manoObraTotal: number;
  repuestosTotal: number;
  impuestoTotal: number;
}
