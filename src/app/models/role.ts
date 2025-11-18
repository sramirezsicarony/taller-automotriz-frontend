import { Auditable } from './base';

export interface Role extends Auditable {
  idRol: number;
  rol: string;
}
