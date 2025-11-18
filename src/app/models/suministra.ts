import { Auditable } from './base';
import { Proveedor } from './proveedor';
import { Repuesto } from './repuesto';

export interface Suministra extends Auditable {
  proveedor: Proveedor;
  repuesto: Repuesto;
  costoUnitario: number;
  cantidad: number;
  costoTotal: number;
  fechaIngreso: string;
}

export interface SuministraCreatePayload {
  idProveedor: number;
  idRepuesto: number;
  costoUnitario: number;
  cantidad: number;
  costoTotal: number;
  fechaIngreso: string;
}
