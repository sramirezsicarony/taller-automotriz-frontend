import { Auditable } from './base';
import { Vehiculo } from './vehiculo';
import { EstadoOrden } from './estado-orden';

export interface OrdenTrabajo extends Auditable {
  idOrdenTrabajo: number;
  vehiculo: Vehiculo;
  diagnosticoInicial: string;
  fechaIngreso: string;  // 'YYYY-MM-DD'
  estadoOrden?: EstadoOrden;
  fechaSalida?: string;  // 'YYYY-MM-DD'
}

export interface OrdenTrabajoCreatePayload {
  idVehiculo: string;
  diagnosticoInicial: string;
  fechaIngreso: string;
  idEstadoOrden?: number;
  fechaSalida?: string;
}
