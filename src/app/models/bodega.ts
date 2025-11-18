import { Auditable } from './base';
import { Almacen } from './almacen';
import { Repuesto } from './repuesto';

export interface Bodega extends Auditable {
  almacen: Almacen;
  repuesto: Repuesto;
  stock: number;
  precioVenta: number;
}

export interface BodegaCreatePayload {
  idAlmacen: number;
  idRepuesto: number;
  stock: number;
  precioVenta: number;
}
