import { Auditable } from './base';
import { AreaLaboral } from './area-laboral';
import { Mecanico } from './mecanico';

export interface AreaTrabajo extends Auditable {
  areaLaboral: AreaLaboral;
  mecanico: Mecanico;
}

export interface AreaTrabajoCreatePayload {
  idAreaLaboral: number;
  idMecanico: string;
}
