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

export interface VehiculoCreatePayload {
  idVehiculo: string;
  marca: string;
  modelo: string;
  anio: number;
  tipoVehiculo: { idTipoVehiculo: number };
  cliente: { idCliente: string };
}
