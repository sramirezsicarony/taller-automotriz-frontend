// src/app/models/tipo-vehiculo.model.ts
import { Auditable } from './base';

export interface TipoVehiculo extends Auditable {
  idTipoVehiculo: number;
  tipo: string;
}

export interface TipoVehiculoCreatePayload {
  tipo: string;
}

// Para /estadisticas/por-tipo y /estadisticas/por-tipo-rango-anio
export interface TipoVehiculoEstadistica {
  idTipoVehiculo: number;
  nombreTipo: string;
  cantidadVehiculos: number;
}
