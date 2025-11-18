// src/app/models/vehiculo-servicio-orden-trabajo.model.ts
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

// Payload para formularios (ids planos)
export interface VehiculoServicioOrdenTrabajoCreatePayload {
  idVehiculo: string;       // placa
  idServicio: number;
  idOrdenTrabajo: number;
  fechaDeEjecucion: string; // 'YYYY-MM-DD'
}

// Para actualizar: mismos campos que para crear
export interface VehiculoServicioOrdenTrabajoUpdatePayload
  extends VehiculoServicioOrdenTrabajoCreatePayload {}

// ========== DTOs de reportes / estadísticas ==========

// /api/vso/estadisticas/ejecuciones-por-servicio
// [idServicio, nombreServicio, cantidadEjecuciones]
export interface EjecucionesServicioReporte {
  idServicio: number;
  nombreServicio: string;
  cantidadEjecuciones: number;
}

// /api/vso/estadisticas/servicios-por-vehiculo-rango
// [idVehiculo, cantidadServicios]
export interface ServiciosPorVehiculoRangoReporte {
  idVehiculo: string;
  cantidadServicios: number;
}

// /api/vso/estadisticas/servicios-por-cliente-rango
// [idCliente, nombreCliente, cantidadServicios]
export interface ServiciosPorClienteRangoReporte {
  idCliente: string;
  nombreCliente: string;
  cantidadServicios: number;
}
