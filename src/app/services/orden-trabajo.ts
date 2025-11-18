// src/app/services/orden-trabajo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  OrdenTrabajo,
  OrdenTrabajoCreatePayload,
  OrdenesPorEstadoReporte,
  OrdenesPorClienteReporte,
  ResumenCostosOrdenReporte
} from '../models/orden-trabajo';

@Injectable({
  providedIn: 'root'
})
export class OrdenTrabajoService {

  private readonly apiUrl = 'http://localhost:8080/api/ordenes-trabajo';

  constructor(private http: HttpClient) {}

  // ====================== CRUD BÁSICO ======================

  /**
   * GET /api/ordenes-trabajo
   */
  getAll(): Observable<OrdenTrabajo[]> {
    return this.http.get<OrdenTrabajo[]>(this.apiUrl);
  }

  /**
   * GET /api/ordenes-trabajo/{idOrdenTrabajo}
   */
  getById(idOrdenTrabajo: number): Observable<OrdenTrabajo> {
    return this.http.get<OrdenTrabajo>(`${this.apiUrl}/${idOrdenTrabajo}`);
  }

  /**
   * POST /api/ordenes-trabajo
   *
   * Body esperado:
   * {
   *   "vehiculo": { "idVehiculo": "ABC123" },
   *   "diagnosticoInicial": "...",
   *   "fechaIngreso": "YYYY-MM-DD",
   *   "estadoOrden": { "idEstadoOrden": 1 } // opcional
   *   "fechaSalida": "YYYY-MM-DD"           // opcional
   * }
   */
  create(payload: OrdenTrabajoCreatePayload): Observable<OrdenTrabajo> {
    return this.http.post<OrdenTrabajo>(this.apiUrl, payload);
  }

  /**
   * PUT /api/ordenes-trabajo/{idOrdenTrabajo}
   *
   * Usamos el mismo payload de creación.
   */
  update(idOrdenTrabajo: number, payload: OrdenTrabajoCreatePayload): Observable<OrdenTrabajo> {
    return this.http.put<OrdenTrabajo>(`${this.apiUrl}/${idOrdenTrabajo}`, payload);
  }

  /**
   * DELETE /api/ordenes-trabajo/{idOrdenTrabajo}
   */
  delete(idOrdenTrabajo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idOrdenTrabajo}`);
  }

  // ====================== CONSULTAS / FILTROS ======================

  /**
   * GET /api/ordenes-trabajo/vehiculo/{idVehiculo}
   */
  listarPorIdVehiculo(idVehiculo: string): Observable<OrdenTrabajo[]> {
    return this.http.get<OrdenTrabajo[]>(`${this.apiUrl}/vehiculo/${idVehiculo}`);
  }

  /**
   * GET /api/ordenes-trabajo/estado/{idEstadoOrden}
   */
  listarPorIdEstadoOrden(idEstadoOrden: number): Observable<OrdenTrabajo[]> {
    return this.http.get<OrdenTrabajo[]>(`${this.apiUrl}/estado/${idEstadoOrden}`);
  }

  /**
   * GET /api/ordenes-trabajo/fecha-ingreso?inicio=YYYY-MM-DD&fin=YYYY-MM-DD
   */
  buscarPorRangoFechaIngreso(inicio: string, fin: string): Observable<OrdenTrabajo[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<OrdenTrabajo[]>(`${this.apiUrl}/fecha-ingreso`, { params });
  }

  /**
   * GET /api/ordenes-trabajo/abiertas
   */
  listarOrdenesAbiertas(): Observable<OrdenTrabajo[]> {
    return this.http.get<OrdenTrabajo[]>(`${this.apiUrl}/abiertas`);
  }

  // ====================== REPORTES / AGREGADOS ======================

  /**
   * GET /api/ordenes-trabajo/por-estado
   * Cada fila: [idEstadoOrden, nombreEstado, cantidadOrdenes]
   */
  contarOrdenesPorEstado(): Observable<OrdenesPorEstadoReporte[]> {
    return this.http.get<OrdenesPorEstadoReporte[]>(`${this.apiUrl}/por-estado`);
  }

  /**
   * GET /api/ordenes-trabajo/por-cliente?inicio=YYYY-MM-DD&fin=YYYY-MM-DD
   * Cada fila: [idCliente, nombreCliente, cantidadOrdenes]
   */
  contarOrdenesPorClienteEnRangoFechas(
    inicio: string,
    fin: string
  ): Observable<OrdenesPorClienteReporte[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<OrdenesPorClienteReporte[]>(
      `${this.apiUrl}/por-cliente`,
      { params }
    );
  }

  /**
   * GET /api/ordenes-trabajo/resumen-costos?inicio=YYYY-MM-DD&fin=YYYY-MM-DD
   * Cada fila:
   * [idOrdenTrabajo, fechaIngreso, totalFacturado,
   *  manoObraTotal, repuestosTotal, impuestoTotal, cantidadFacturas]
   */
  obtenerResumenCostosPorOrdenEnRangoFechas(
    inicio: string,
    fin: string
  ): Observable<ResumenCostosOrdenReporte[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<ResumenCostosOrdenReporte[]>(
      `${this.apiUrl}/resumen-costos`,
      { params }
    );
  }
}
