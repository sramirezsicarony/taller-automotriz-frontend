import { Auditable } from './base';
import { OrdenTrabajo } from './orden-trabajo';
import { Cliente } from './cliente';
import { EstadoFactura } from './estado-factura';

export interface Factura extends Auditable {
  idFactura: number;
  ordenTrabajo: OrdenTrabajo;
  estadoFactura: EstadoFactura;
  cliente: Cliente;
  fechaCreacion: string;
  subTotalManoDeObra: number;
  subTotalRepuestos: number;
  impuesto: number;
  total: number;
}

export interface FacturaCreatePayload {
  idOrdenTrabajo: number;
  idEstadoFactura: number;
  idCliente: string;
  fechaCreacion: string;
  subTotalManoDeObra: number;
  subTotalRepuestos: number;
  impuesto: number;
  total: number;
}
