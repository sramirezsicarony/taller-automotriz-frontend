// src/app/models/area-trabajo.model.ts
import { Auditable } from './base';
import { AreaLaboral } from './area-laboral';
import { Mecanico } from './mecanico';

export interface AreaTrabajo extends Auditable {
  areaLaboral: AreaLaboral;
  mecanico: Mecanico;

}

export interface AreaTrabajoCreatePayload {
  areaLaboral: { idAreaLaboral: number };
  mecanico: { idMecanico: string };
}

export interface MecanicosPorAreaEstadistica {
  idAreaLaboral: number;
  nombreArea: string;
  cantidadMecanicos: number;
}

export interface AreasPorMecanicoEstadistica {
  idMecanico: string;
  cantidadAreas: number;
}

export interface HorasCostoPorAreaEstadistica {
  idAreaLaboral: number;
  nombreArea: string;
  horasTotales: number;
  costoTotal: number;
}
