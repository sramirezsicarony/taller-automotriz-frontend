// src/app/services/vehiculo-servicio-orden-trabajo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  VehiculoServicioOrdenTrabajo,
  VehiculoServicioOrdenTrabajoCreatePayload,
  VehiculoServicioOrdenTrabajoUpdatePayload,
  EjecucionesServicioReporte,
  ServiciosPorVehiculoRangoReporte,
  ServiciosPorClienteRangoReporte,
} from '../models/vehiculo-servicio-ot';

@Injectable({
  providedIn: 'root',
})
export class VehiculoServicioOrdenTrabajoService {
  private readonly apiUrl = 'http://localhost:8080/api/vso';

  constructor(private http: HttpClient) {}

  // ================== CRUD BÁSICO ==================

  /**
   * GET /api/vso
   */
  getAll(): Observable<VehiculoServicioOrdenTrabajo[]> {
    return this.http.get<VehiculoServicioOrdenTrabajo[]>(this.apiUrl);
  }

  /**
   * GET /api/vso/{id}
   */
  getById(id: number): Observable<VehiculoServicioOrdenTrabajo> {
    return this.http.get<VehiculoServicioOrdenTrabajo>(`${this.apiUrl}/${id}`);
  }

  /**
   * POST /api/vso
   *
   * Backend espera:
   * {
   *   "vehiculo": { "idVehiculo": "ABC123" },
   *   "servicio": { "idServicio": 1 },
   *   "ordenTrabajo": { "idOrdenTrabajo": 10 },
   *   "fechaDeEjecucion": "2025-11-17"
   * }
   */
  create(
    payload: VehiculoServicioOrdenTrabajoCreatePayload
  ): Observable<VehiculoServicioOrdenTrabajo> {
    const body = {
      vehiculo: { idVehiculo: payload.idVehiculo },
      servicio: { idServicio: payload.idServicio },
      ordenTrabajo: { idOrdenTrabajo: payload.idOrdenTrabajo },
      fechaDeEjecucion: payload.fechaDeEjecucion,
    };

    return this.http.post<VehiculoServicioOrdenTrabajo>(this.apiUrl, body);
  }

  /**
   * PUT /api/vso/{id}
   */
  update(
    id: number,
    payload: VehiculoServicioOrdenTrabajoUpdatePayload
  ): Observable<VehiculoServicioOrdenTrabajo> {
    const body = {
      vehiculo: { idVehiculo: payload.idVehiculo },
      servicio: { idServicio: payload.idServicio },
      ordenTrabajo: { idOrdenTrabajo: payload.idOrdenTrabajo },
      fechaDeEjecucion: payload.fechaDeEjecucion,
    };

    return this.http.put<VehiculoServicioOrdenTrabajo>(`${this.apiUrl}/${id}`, body);
  }

  /**
   * DELETE /api/vso/{id}
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ================== CONSULTAS SIMPLES / INTERMEDIAS ==================

  /**
   * GET /api/vso/por-vehiculo/{idVehiculo}
   */
  listarPorIdVehiculo(idVehiculo: string): Observable<VehiculoServicioOrdenTrabajo[]> {
    return this.http.get<VehiculoServicioOrdenTrabajo[]>(
      `${this.apiUrl}/por-vehiculo/${idVehiculo}`
    );
  }

  /**
   * GET /api/vso/por-servicio/{idServicio}
   */
  listarPorIdServicio(idServicio: number): Observable<VehiculoServicioOrdenTrabajo[]> {
    return this.http.get<VehiculoServicioOrdenTrabajo[]>(
      `${this.apiUrl}/por-servicio/${idServicio}`
    );
  }

  /**
   * GET /api/vso/por-orden/{idOrdenTrabajo}
   */
  listarPorIdOrdenTrabajo(
    idOrdenTrabajo: number
  ): Observable<VehiculoServicioOrdenTrabajo[]> {
    return this.http.get<VehiculoServicioOrdenTrabajo[]>(
      `${this.apiUrl}/por-orden/${idOrdenTrabajo}`
    );
  }

  /**
   * GET /api/vso/por-fecha-ejecucion?inicio=YYYY-MM-DD&fin=YYYY-MM-DD
   */
  buscarPorRangoFechaEjecucion(
    inicio: string,
    fin: string
  ): Observable<VehiculoServicioOrdenTrabajo[]> {
    const params = new HttpParams().set('inicio', inicio).set('fin', fin);

    return this.http.get<VehiculoServicioOrdenTrabajo[]>(
      `${this.apiUrl}/por-fecha-ejecucion`,
      { params }
    );
  }

  // ================== CONSULTAS COMPLEJAS / ESTADÍSTICAS ==================

  /**
   * GET /api/vso/estadisticas/ejecuciones-por-servicio
   */
  contarEjecucionesPorServicio(): Observable<EjecucionesServicioReporte[]> {
    return this.http.get<EjecucionesServicioReporte[]>(
      `${this.apiUrl}/estadisticas/ejecuciones-por-servicio`
    );
  }

  /**
   * GET /api/vso/estadisticas/servicios-por-vehiculo-rango?inicio=YYYY-MM-DD&fin=YYYY-MM-DD
   */
  obtenerCantidadServiciosPorVehiculoEnRangoFechas(
    inicio: string,
    fin: string
  ): Observable<ServiciosPorVehiculoRangoReporte[]> {
    const params = new HttpParams().set('inicio', inicio).set('fin', fin);

    return this.http.get<ServiciosPorVehiculoRangoReporte[]>(
      `${this.apiUrl}/estadisticas/servicios-por-vehiculo-rango`,
      { params }
    );
  }

  /**
   * GET /api/vso/estadisticas/servicios-por-cliente-rango?inicio=YYYY-MM-DD&fin=YYYY-MM-DD
   */
  obtenerServiciosPorClienteEnRangoFechas(
    inicio: string,
    fin: string
  ): Observable<ServiciosPorClienteRangoReporte[]> {
    const params = new HttpParams().set('inicio', inicio).set('fin', fin);

    return this.http.get<ServiciosPorClienteRangoReporte[]>(
      `${this.apiUrl}/estadisticas/servicios-por-cliente-rango`,
      { params }
    );
  }
}
