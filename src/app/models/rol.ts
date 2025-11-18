// src/app/models/rol.model.ts
import { Auditable } from './base';

export interface Rol extends Auditable {
  idRol: number;   // Byte en backend, number en TS
  rol: string;
}

/**
 * Para crear un Rol (POST /api/roles)
 */
export interface RolCreatePayload {
  rol: string;
}

/**
 * Para actualizar un Rol (PUT /api/roles/{idRol})
 */
export interface RolUpdatePayload {
  rol: string;
}

// ========== DTOs de reportes / estadísticas ==========

// Coinciden con RolAsignacionesDTO del controller
export interface RolAsignacionesReporte {
  idRol: number;
  nombreRol: string;
  cantidadAsignaciones: number;
}

// Coinciden con HorasPorRolDTO del controller
export interface RolHorasReporte {
  idRol: number;
  nombreRol: string;
  horasTotales: number;
}
