import { Auditable } from './base';

export interface EstadoFactura extends Auditable {
  idEstadoFactura: number;
  estado: string;
}
