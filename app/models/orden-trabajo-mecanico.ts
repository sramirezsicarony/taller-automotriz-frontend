// src/app/models/orden-trabajo-mecanico.model.ts
import { Auditable } from './base';
import { OrdenTrabajo } from './orden-trabajo';
import { Mecanico } from './mecanico';
import { Rol } from './rol'; 

export interface OrdenTrabajoMecanico extends Auditable {
  ordenTrabajo: OrdenTrabajo;
  mecanico: Mecanico;
  rol: Rol;        // Rol en backend
  horas: number;
  costoHora: number;
  costoTotal: number;
}

/**
 * Payload que usarás en el front.
 * El service se encargará de convertir esto a la estructura que espera el backend.
 */
export interface OrdenTrabajoMecanicoCreatePayload {
  idOrdenTrabajo: number;
  idMecanico: string;
  idRol: number;
  horas: number;
  costoHora: number;
  costoTotal: number;
}

export interface OrdenTrabajoMecanicoUpdatePayload {
  // PK viene por path (idOrdenTrabajo, idMecanico)
  idRol: number;
  horas: number;
  costoHora: number;
  costoTotal: number;
}

// ========== DTOs de reportes / estadísticas ==========

// Coincide con HorasCostoPorMecanicoDTO
export interface HorasCostoPorMecanicoReporte {
  idMecanico: string;
  horasTotales: number;
  costoTotal: number;
}

// Coincide con HorasCostoPorOrdenDTO
export interface HorasCostoPorOrdenReporte {
  idOrdenTrabajo: number;
  horasTotales: number;
  costoTotal: number;
}

// Coincide con HorasCostoPorRolDTO
export interface HorasCostoPorRolReporte {
  idRol: number;
  nombreRol: string;
  horasTotales: number;
  costoTotal: number;
}
