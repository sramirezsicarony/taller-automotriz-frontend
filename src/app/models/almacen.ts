import { Auditable } from './base';

export interface Almacen extends Auditable {
  idAlmacen: number;
  nombre: string;
  direccion: string;
}
