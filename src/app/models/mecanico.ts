import { Auditable } from './base';
import { Especialidad } from './especialidad';

export interface Mecanico extends Auditable {
  idMecanico: string;  // DNI
  experiencia: number;
  costoHora: number;
  especialidad: Especialidad;
}

export interface MecanicoCreatePayload {
  idMecanico: string;
  experiencia: number;
  costoHora: number;
  especialidad: { idEspecialidad: number };
}
