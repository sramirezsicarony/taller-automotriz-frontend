import { Auditable } from './base';

export interface Servicio extends Auditable {
  idServicio: number;
  servicio: string;
  descripcion?: string;
}
