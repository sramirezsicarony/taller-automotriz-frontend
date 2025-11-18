import { Auditable } from './base';
import { OrdenTrabajo } from './orden-trabajo';
import { Repuesto } from './repuesto';

export interface DetalleOrdenRepuesto extends Auditable {
  ordenTrabajo: OrdenTrabajo;
  repuesto: Repuesto;
  cantidad: number;
  subTotal: number;
}

export interface DetalleOrdenRepuestoCreatePayload {
  idOrdenTrabajo: number;
  idRepuesto: number;
  cantidad: number;
  subTotal: number;
}
