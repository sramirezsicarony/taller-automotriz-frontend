export interface MecanicoCreatePayload {
  idMecanico: string;
  experiencia: number;
  costoHora: number;
  especialidad: { idEspecialidad: number };
}
