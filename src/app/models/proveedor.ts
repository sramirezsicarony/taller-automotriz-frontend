import { Auditable } from './base';

export interface Proveedor extends Auditable {
  idProveedor: number;
  nombre: string;
  telefono: string;
  direccion: string;
}
