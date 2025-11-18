import { Auditable } from './base';

export interface Especialidad extends Auditable {
  idEspecialidad: number;
  nombreEspecialidad: string;
  descripcion?: string;
}
