import { Auditable } from './base';

export interface EstadoOrden extends Auditable {
  idEstadoOrden: number;
  estado: string;
}
