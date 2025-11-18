import { Auditable } from './base';
import { OrdenTrabajo } from './orden-trabajo';
import { Mecanico } from './mecanico';
import { Role } from './role';

export interface OrdenTrabajoMecanico extends Auditable {
  ordenTrabajo: OrdenTrabajo;
  mecanico: Mecanico;
  rol: Role;
  horas: number;
  costoHora: number;
  costoTotal: number;
}

export interface OrdenTrabajoMecanicoCreatePayload {
  idOrdenTrabajo: number;
  idMecanico: string;
  idRol: number;
  horas: number;
  costoHora: number;
  costoTotal: number;
}
