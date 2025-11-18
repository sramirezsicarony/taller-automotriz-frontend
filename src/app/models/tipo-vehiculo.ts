import { Auditable } from './base';

export interface TipoVehiculo extends Auditable {
  idTipoVehiculo: number;
  tipo: string;
}
