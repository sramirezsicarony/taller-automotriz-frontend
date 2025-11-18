// src/app/services/area-trabajo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AreaTrabajo,
  AreaTrabajoCreatePayload,
  MecanicosPorAreaEstadistica,
  AreasPorMecanicoEstadistica,
  HorasCostoPorAreaEstadistica
} from '../models/area-trabajo';

@Injectable({
  providedIn: 'root'
})
export class AreaTrabajoService {

  private readonly apiUrl = 'http://localhost:8080/api/area-trabajos';

  constructor(private http: HttpClient) {}

  // ================== CRUD BÁSICO ==================

  /**
   * GET /api/area-trabajos
   */
  getAll(): Observable<AreaTrabajo[]> {
    return this.http.get<AreaTrabajo[]>(this.apiUrl);
  }

  /**
   * GET /api/area-trabajos/{idAreaLaboral}/{idMecanico}
   */
  getById(idAreaLaboral: number, idMecanico: string): Observable<AreaTrabajo> {
    return this.http.get<AreaTrabajo>(
      `${this.apiUrl}/${idAreaLaboral}/${idMecanico}`
    );
  }

  /**
   * POST /api/area-trabajos
   *
   * Body:
   * {
   *   "areaLaboral": { "idAreaLaboral": 1 },
   *   "mecanico": { "idMecanico": "123" }
   * }
   */
  create(payload: AreaTrabajoCreatePayload): Observable<AreaTrabajo> {
    return this.http.post<AreaTrabajo>(this.apiUrl, payload);
  }

  /**
   * PUT /api/area-trabajos/{idAreaLaboral}/{idMecanico}
   *
   * Ojo: en backend no se actualizan las claves de la PK compuesta.
   * Este endpoint solo sería útil si en el futuro agregas más columnas.
   */
  update(
    idAreaLaboral: number,
    idMecanico: string,
    payload: AreaTrabajoCreatePayload
  ): Observable<AreaTrabajo> {
    return this.http.put<AreaTrabajo>(
      `${this.apiUrl}/${idAreaLaboral}/${idMecanico}`,
      payload
    );
  }

  /**
   * DELETE /api/area-trabajos/{idAreaLaboral}/{idMecanico}
   */
  delete(idAreaLaboral: number, idMecanico: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${idAreaLaboral}/${idMecanico}`
    );
  }

  // ============ CONSULTAS SIMPLES / INTERMEDIAS ============

  /**
   * GET /api/area-trabajos/por-area/{idAreaLaboral}
   */
  listarPorIdAreaLaboral(idAreaLaboral: number): Observable<AreaTrabajo[]> {
    return this.http.get<AreaTrabajo[]>(
      `${this.apiUrl}/por-area/${idAreaLaboral}`
    );
  }

  /**
   * GET /api/area-trabajos/por-mecanico/{idMecanico}
   */
  listarPorIdMecanico(idMecanico: string): Observable<AreaTrabajo[]> {
    return this.http.get<AreaTrabajo[]>(
      `${this.apiUrl}/por-mecanico/${idMecanico}`
    );
  }

  /**
   * GET /api/area-trabajos/creadas?inicio=...&fin=...
   *
   * inicio / fin en formato ISO-8601: "yyyy-MM-ddTHH:mm:ss"
   */
  buscarPorRangoFechasCreacion(
    inicio: string,
    fin: string
  ): Observable<AreaTrabajo[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<AreaTrabajo[]>(
      `${this.apiUrl}/creadas`,
      { params }
    );
  }

  /**
   * GET /api/area-trabajos/buscar-por-area?texto=meca
   */
  buscarPorNombreAreaConteniendo(texto: string): Observable<AreaTrabajo[]> {
    const params = new HttpParams().set('texto', texto);
    return this.http.get<AreaTrabajo[]>(
      `${this.apiUrl}/buscar-por-area`,
      { params }
    );
  }

  // ============ ESTADÍSTICAS / REPORTES ============

  /**
   * GET /api/area-trabajos/estadisticas/mecanicos-por-area
   *
   * Devuelve:
   * [
   *   { idAreaLaboral, nombreArea, cantidadMecanicos },
   *   ...
   * ]
   */
  contarMecanicosPorAreaLaboral(): Observable<MecanicosPorAreaEstadistica[]> {
    return this.http.get<MecanicosPorAreaEstadistica[]>(
      `${this.apiUrl}/estadisticas/mecanicos-por-area`
    );
  }

  /**
   * GET /api/area-trabajos/estadisticas/areas-por-mecanico
   *
   * Devuelve:
   * [
   *   { idMecanico, cantidadAreas },
   *   ...
   * ]
   */
  contarAreasPorMecanico(): Observable<AreasPorMecanicoEstadistica[]> {
    return this.http.get<AreasPorMecanicoEstadistica[]>(
      `${this.apiUrl}/estadisticas/areas-por-mecanico`
    );
  }

  /**
   * GET /api/area-trabajos/estadisticas/horas-costo-por-area?inicio=...&fin=...
   *
   * inicio / fin en formato ISO-8601: "yyyy-MM-ddTHH:mm:ss"
   */
  obtenerHorasYCostoPorAreaEnRangoFechas(
    inicio: string,
    fin: string
  ): Observable<HorasCostoPorAreaEstadistica[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<HorasCostoPorAreaEstadistica[]>(
      `${this.apiUrl}/estadisticas/horas-costo-por-area`,
      { params }
    );
  }
}
