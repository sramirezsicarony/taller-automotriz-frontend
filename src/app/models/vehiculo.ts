// src/app/models/vehiculo.model.ts
import { Auditable } from './base';
import { TipoVehiculo } from './tipo-vehiculo';
import { Cliente } from './cliente';

export interface Vehiculo extends Auditable {
  idVehiculo: string;      // placa
  tipoVehiculo: TipoVehiculo;
  marca: string;
  modelo: string;
  anio: number;
  cliente: Cliente;
}

/**
 * Payload mínimo que el backend necesita.
 *
 * El Controller recibe un Vehiculo completo, pero como en JPA
 * los @ManyToOne son entidades, podemos enviar solo los IDs dentro
 * de objetos anidados:
 * {
 *   "idVehiculo": "ABC123",
 *   "marca": "Toyota",
 *   "modelo": "Corolla",
 *   "anio": 2018,
 *   "tipoVehiculo": { "idTipoVehiculo": 1 },
 *   "cliente": { "idCliente": "12345678" }
 * }
 */
export interface VehiculoCreatePayload {
  idVehiculo: string;
  marca: string;
  modelo: string;
  anio: number;
  tipoVehiculo: { idTipoVehiculo: number };
  cliente: { idCliente: string };
}

// ========= OPCIONALES: para mapear los reportes (List<Object[]>) =========

// /api/vehiculos/ordenes → [idVehiculo, marca, modelo, anio, cantidadOrdenes]
export interface VehiculoOrdenesResumen {
  idVehiculo: string;
  marca: string;
  modelo: string;
  anio: number;
  cantidadOrdenes: number;
}

// /api/vehiculos/facturacion →
// [idVehiculo, marca, modelo, anio, totalFacturado, cantidadFacturas]
export interface VehiculoFacturacionResumen {
  idVehiculo: string;
  marca: string;
  modelo: string;
  anio: number;
  totalFacturado: number;
  cantidadFacturas: number;
}
