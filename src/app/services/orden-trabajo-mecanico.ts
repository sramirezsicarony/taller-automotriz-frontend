// src/app/services/orden-trabajo-mecanico.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  OrdenTrabajoMecanico,
  OrdenTrabajoMecanicoCreatePayload,
  OrdenTrabajoMecanicoUpdatePayload,
  HorasCostoPorMecanicoReporte,
  HorasCostoPorOrdenReporte,
  HorasCostoPorRolReporte,
} from '../models/orden-trabajo-mecanico';

@Injectable({
  providedIn: 'root',
})
export class OrdenTrabajoMecanicoService {
  private readonly apiUrl = 'http://localhost:8080/api/orden-trabajo-mecanico';

  constructor(private http: HttpClient) {}

  // ================== CRUD BÁSICO ==================

  /**
   * GET /api/orden-trabajo-mecanico
   */
  getAll(): Observable<OrdenTrabajoMecanico[]> {
    return this.http.get<OrdenTrabajoMecanico[]>(this.apiUrl);
  }

  /**
   * GET /api/orden-trabajo-mecanico/{idOrdenTrabajo}/{idMecanico}
   */
  getById(idOrdenTrabajo: number, idMecanico: string): Observable<OrdenTrabajoMecanico> {
    return this.http.get<OrdenTrabajoMecanico>(
      `${this.apiUrl}/${idOrdenTrabajo}/${idMecanico}`
    );
  }

  /**
   * POST /api/orden-trabajo-mecanico
   *
   * Transformamos el payload plano (con IDs) al JSON que espera el backend.
   */
  create(payload: OrdenTrabajoMecanicoCreatePayload): Observable<OrdenTrabajoMecanico> {
    const body = {
      ordenTrabajo: { idOrdenTrabajo: payload.idOrdenTrabajo },
      mecanico: { idMecanico: payload.idMecanico },
      rol: { idRol: payload.idRol },
      horas: payload.horas,
      costoHora: payload.costoHora,
      costoTotal: payload.costoTotal,
    };

    return this.http.post<OrdenTrabajoMecanico>(this.apiUrl, body);
  }

  /**
   * PUT /api/orden-trabajo-mecanico/{idOrdenTrabajo}/{idMecanico}
   *
   * La PK viene en la URL, en el body solo enviamos los campos modificables.
   */
  update(
    idOrdenTrabajo: number,
    idMecanico: string,
    payload: OrdenTrabajoMecanicoUpdatePayload
  ): Observable<OrdenTrabajoMecanico> {
    const body = {
      rol: { idRol: payload.idRol },
      horas: payload.horas,
      costoHora: payload.costoHora,
      costoTotal: payload.costoTotal,
    };

    return this.http.put<OrdenTrabajoMecanico>(
      `${this.apiUrl}/${idOrdenTrabajo}/${idMecanico}`,
      body
    );
  }

  /**
   * DELETE /api/orden-trabajo-mecanico/{idOrdenTrabajo}/{idMecanico}
   */
  delete(idOrdenTrabajo: number, idMecanico: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${idOrdenTrabajo}/${idMecanico}`
    );
  }

  // ================== CONSULTAS SIMPLES / INTERMEDIAS ==================

  /**
   * GET /api/orden-trabajo-mecanico/por-orden/{idOrdenTrabajo}
   */
  listarPorIdOrdenTrabajo(idOrdenTrabajo: number): Observable<OrdenTrabajoMecanico[]> {
    return this.http.get<OrdenTrabajoMecanico[]>(
      `${this.apiUrl}/por-orden/${idOrdenTrabajo}`
    );
  }

  /**
   * GET /api/orden-trabajo-mecanico/por-mecanico/{idMecanico}
   */
  listarPorIdMecanico(idMecanico: string): Observable<OrdenTrabajoMecanico[]> {
    return this.http.get<OrdenTrabajoMecanico[]>(
      `${this.apiUrl}/por-mecanico/${idMecanico}`
    );
  }

  /**
   * GET /api/orden-trabajo-mecanico/por-rol/{idRol}
   */
  listarPorIdRol(idRol: number): Observable<OrdenTrabajoMecanico[]> {
    return this.http.get<OrdenTrabajoMecanico[]>(
      `${this.apiUrl}/por-rol/${idRol}`
    );
  }

  /**
   * GET /api/orden-trabajo-mecanico/buscar/horas?min=1.0&max=8.0
   */
  buscarPorRangoHoras(
    horasMin: number,
    horasMax: number
  ): Observable<OrdenTrabajoMecanico[]> {
    let params = new HttpParams()
      .set('min', horasMin.toString())
      .set('max', horasMax.toString());

    return this.http.get<OrdenTrabajoMecanico[]>(
      `${this.apiUrl}/buscar/horas`,
      { params }
    );
  }

  /**
   * GET /api/orden-trabajo-mecanico/creados?inicio=YYYY-MM-DDTHH:mm:ss&fin=YYYY-MM-DDTHH:mm:ss
   *
   * Ejemplo:
   *  inicio = '2025-01-01T00:00:00'
   *  fin    = '2025-12-31T23:59:59'
   */
  buscarPorRangoFechasCreacion(
    inicio: string,
    fin: string
  ): Observable<OrdenTrabajoMecanico[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<OrdenTrabajoMecanico[]>(
      `${this.apiUrl}/creados`,
      { params }
    );
  }

  // ================== CONSULTAS COMPLEJAS / ESTADÍSTICAS ==================

  /**
   * GET /api/orden-trabajo-mecanico/estadisticas/horas-costo-por-mecanico?inicio=...&fin=...
   */
  obtenerHorasYCostoTotalPorMecanicoEnRangoFechas(
    inicio: string,
    fin: string
  ): Observable<HorasCostoPorMecanicoReporte[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<HorasCostoPorMecanicoReporte[]>(
      `${this.apiUrl}/estadisticas/horas-costo-por-mecanico`,
      { params }
    );
  }

  /**
   * GET /api/orden-trabajo-mecanico/estadisticas/horas-costo-por-orden
   */
  obtenerHorasYCostoTotalPorOrden(): Observable<HorasCostoPorOrdenReporte[]> {
    return this.http.get<HorasCostoPorOrdenReporte[]>(
      `${this.apiUrl}/estadisticas/horas-costo-por-orden`
    );
  }

  /**
   * GET /api/orden-trabajo-mecanico/estadisticas/horas-costo-por-rol?inicio=...&fin=...
   */
  obtenerHorasYCostoTotalPorRolEnRangoFechas(
    inicio: string,
    fin: string
  ): Observable<HorasCostoPorRolReporte[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<HorasCostoPorRolReporte[]>(
      `${this.apiUrl}/estadisticas/horas-costo-por-rol`,
      { params }
    );
  }
}
