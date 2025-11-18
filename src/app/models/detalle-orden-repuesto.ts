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

export interface DetalleOrdenRepuestoId {
  idOrdenTrabajo: number;
  idRepuesto: number;
}

export interface ResumenRepuestosPorOrdenDTO {
  idOrdenTrabajo: number;
  cantidadTotal: number;
  totalRepuestos: number;
}

export interface RepuestoMasUtilizadoDTO {
  idRepuesto: number;
  nombreRepuesto: string;
  cantidadTotal: number;
  totalRepuestos: number;
}

export interface ConsumoRepuestosClienteDTO {
  idCliente: string;
  nombreCliente: string;
  cantidadTotal: number;
  totalRepuestos: number;
}
