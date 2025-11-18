// src/app/models/orden-trabajo.model.ts
import { Auditable } from './base';
import { Vehiculo } from './vehiculo';
import { EstadoOrden } from './estado-orden';

export interface OrdenTrabajo extends Auditable {
  idOrdenTrabajo: number;
  vehiculo: Vehiculo;
  diagnosticoInicial: string;
  fechaIngreso: string;  // 'YYYY-MM-DD'
  estadoOrden?: EstadoOrden | null;
  fechaSalida?: string | null;  // 'YYYY-MM-DD'
}

export interface OrdenTrabajoCreatePayload {
  vehiculo: { idVehiculo: string };
  diagnosticoInicial: string;
  fechaIngreso: string;              // 'YYYY-MM-DD'
  estadoOrden?: { idEstadoOrden: number } | null;
  fechaSalida?: string | null;       // 'YYYY-MM-DD' o null
}


// Para GET /api/ordenes-trabajo/por-estado
export interface OrdenesPorEstadoReporte {
  idEstadoOrden: number;
  nombreEstado: string;
  cantidadOrdenes: number;
}

// Para GET /api/ordenes-trabajo/por-cliente
export interface OrdenesPorClienteReporte {
  idCliente: string;
  nombreCliente: string;
  cantidadOrdenes: number;
}

// Para GET /api/ordenes-trabajo/resumen-costos
export interface ResumenCostosOrdenReporte {
  idOrdenTrabajo: number;
  fechaIngreso: string;      // 'YYYY-MM-DD'
  totalFacturado: number;
  manoObraTotal: number;
  repuestosTotal: number;
  impuestoTotal: number;
  cantidadFacturas: number;
}
