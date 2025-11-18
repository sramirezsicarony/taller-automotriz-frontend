// src/app/services/rol.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Rol,
  RolCreatePayload,
  RolUpdatePayload,
  RolAsignacionesReporte,
  RolHorasReporte,
} from '../models/rol';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  private readonly apiUrl = 'http://localhost:8080/api/roles';

  constructor(private http: HttpClient) {}

  // ================== CRUD BÁSICO ==================

  /**
   * GET /api/roles
   */
  getAll(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl);
  }

  /**
   * GET /api/roles/{idRol}
   */
  getById(idRol: number): Observable<Rol> {
    return this.http.get<Rol>(`${this.apiUrl}/${idRol}`);
  }

  /**
   * POST /api/roles
   *
   * Body ejemplo:
   * { "rol": "JEFE DE TALLER" }
   */
  create(payload: RolCreatePayload): Observable<Rol> {
    const body = {
      rol: payload.rol,
    };
    return this.http.post<Rol>(this.apiUrl, body);
  }

  /**
   * PUT /api/roles/{idRol}
   */
  update(idRol: number, payload: RolUpdatePayload): Observable<Rol> {
    const body = {
      rol: payload.rol,
    };
    return this.http.put<Rol>(`${this.apiUrl}/${idRol}`, body);
  }

  /**
   * DELETE /api/roles/{idRol}
   */
  delete(idRol: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idRol}`);
  }

  // ========== CONSULTAS SIMPLES / INTERMEDIAS ==========

  /**
   * GET /api/roles/por-nombre?nombre=JEFE%20DE%20TALLER
   *
   * OJO: si no existe, el backend devuelve 404.
   * En el componente puedes manejar el error (HttpErrorResponse).
   */
  obtenerPorNombre(nombreRol: string): Observable<Rol> {
    const params = new HttpParams().set('nombre', nombreRol);
    return this.http.get<Rol>(`${this.apiUrl}/por-nombre`, { params });
  }

  /**
   * GET /api/roles/buscar?texto=jefe
   */
  buscarPorNombreConteniendo(texto: string): Observable<Rol[]> {
    const params = new HttpParams().set('texto', texto);
    return this.http.get<Rol[]>(`${this.apiUrl}/buscar`, { params });
  }

  /**
   * GET /api/roles/creados?inicio=YYYY-MM-DDTHH:mm:ss&fin=YYYY-MM-DDTHH:mm:ss
   */
  buscarPorRangoFechasCreacion(
    inicio: string,
    fin: string
  ): Observable<Rol[]> {
    const params = new HttpParams().set('inicio', inicio).set('fin', fin);
    return this.http.get<Rol[]>(`${this.apiUrl}/creados`, { params });
  }

  /**
   * GET /api/roles/ordenados
   */
  listarOrdenadosPorNombre(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.apiUrl}/ordenados`);
  }

  /**
   * GET /api/roles/sin-asignaciones
   */
  listarRolesSinAsignaciones(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${this.apiUrl}/sin-asignaciones`);
  }

  // ========== CONSULTAS COMPLEJAS / ESTADÍSTICAS ==========

  /**
   * GET /api/roles/estadisticas/asignaciones
   *
   * Devuelve List<RolAsignacionesDTO>:
   * { idRol, nombreRol, cantidadAsignaciones }
   */
  contarAsignacionesPorRol(): Observable<RolAsignacionesReporte[]> {
    return this.http.get<RolAsignacionesReporte[]>(
      `${this.apiUrl}/estadisticas/asignaciones`
    );
  }

  /**
   * GET /api/roles/estadisticas/horas?inicio=...&fin=...
   *
   * Devuelve List<HorasPorRolDTO>:
   * { idRol, nombreRol, horasTotales }
   */
  obtenerHorasTotalesPorRolEnRangoFechas(
    inicio: string,
    fin: string
  ): Observable<RolHorasReporte[]> {
    const params = new HttpParams().set('inicio', inicio).set('fin', fin);

    return this.http.get<RolHorasReporte[]>(
      `${this.apiUrl}/estadisticas/horas`,
      { params }
    );
  }
}
