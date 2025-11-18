import { Auditable } from './base';
import { Vehiculo } from './vehiculo';
import { Servicio } from './servicio';
import { OrdenTrabajo } from './orden-trabajo';

export interface VehiculoServicioOrdenTrabajo extends Auditable {
  idVehiculoServicioOrdenTrabajo: number;
  vehiculo: Vehiculo;
  servicio: Servicio;
  ordenTrabajo: OrdenTrabajo;
  fechaDeEjecucion: string; // 'YYYY-MM-DD'
}

export interface VehiculoServicioOrdenTrabajoCreatePayload {
  idVehiculo: string;
  idServicio: number;
  idOrdenTrabajo: number;
  fechaDeEjecucion: string;
}
