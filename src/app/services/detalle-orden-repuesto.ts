// src/app/services/detalle-orden-repuesto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  DetalleOrdenRepuesto,
  DetalleOrdenRepuestoCreatePayload,
  ResumenRepuestosPorOrdenDTO,
  RepuestoMasUtilizadoDTO,
  ConsumoRepuestosClienteDTO,
} from '../models/detalle-orden-repuesto';

@Injectable({
  providedIn: 'root',
})
export class DetalleOrdenRepuestoService {
  private readonly apiUrl = 'http://localhost:8080/api/detalle-orden-repuesto';

  constructor(private http: HttpClient) {}

  // ================== CRUD BÁSICO ==================

  /**
   * GET /api/detalle-orden-repuesto
   */
  getAll(): Observable<DetalleOrdenRepuesto[]> {
    return this.http.get<DetalleOrdenRepuesto[]>(this.apiUrl);
  }

  /**
   * GET /api/detalle-orden-repuesto/{idOrdenTrabajo}/{idRepuesto}
   */
  getById(
    idOrdenTrabajo: number,
    idRepuesto: number
  ): Observable<DetalleOrdenRepuesto> {
    return this.http.get<DetalleOrdenRepuesto>(
      `${this.apiUrl}/${idOrdenTrabajo}/${idRepuesto}`
    );
  }

  /**
   * POST /api/detalle-orden-repuesto
   *
   * Backend espera:
   * {
   *   "ordenTrabajo": { "idOrdenTrabajo": 1 },
   *   "repuesto": { "idRepuesto": 10 },
   *   "cantidad": 3,
   *   "subTotal": 150000.00
   * }
   */
  create(
    payload: DetalleOrdenRepuestoCreatePayload
  ): Observable<DetalleOrdenRepuesto> {
    const body = {
      ordenTrabajo: { idOrdenTrabajo: payload.idOrdenTrabajo },
      repuesto: { idRepuesto: payload.idRepuesto },
      cantidad: payload.cantidad,
      subTotal: payload.subTotal,
    };

    return this.http.post<DetalleOrdenRepuesto>(this.apiUrl, body);
  }

  /**
   * PUT /api/detalle-orden-repuesto/{idOrdenTrabajo}/{idRepuesto}
   *
   * Solo actualiza datos (cantidad, subTotal).
   * Las claves de la PK NO se cambian.
   */
  update(
    idOrdenTrabajo: number,
    idRepuesto: number,
    payload: Pick<DetalleOrdenRepuestoCreatePayload, 'cantidad' | 'subTotal'>
  ): Observable<DetalleOrdenRepuesto> {
    const body = {
      cantidad: payload.cantidad,
      subTotal: payload.subTotal,
    };

    return this.http.put<DetalleOrdenRepuesto>(
      `${this.apiUrl}/${idOrdenTrabajo}/${idRepuesto}`,
      body
    );
  }

  /**
   * DELETE /api/detalle-orden-repuesto/{idOrdenTrabajo}/{idRepuesto}
   */
  delete(idOrdenTrabajo: number, idRepuesto: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${idOrdenTrabajo}/${idRepuesto}`
    );
  }

  // ================== CONSULTAS SIMPLES / INTERMEDIAS ==================

  /**
   * GET /api/detalle-orden-repuesto/por-orden/{idOrdenTrabajo}
   */
  listarPorIdOrdenTrabajo(
    idOrdenTrabajo: number
  ): Observable<DetalleOrdenRepuesto[]> {
    return this.http.get<DetalleOrdenRepuesto[]>(
      `${this.apiUrl}/por-orden/${idOrdenTrabajo}`
    );
  }

  /**
   * GET /api/detalle-orden-repuesto/por-repuesto/{idRepuesto}
   */
  listarPorIdRepuesto(
    idRepuesto: number
  ): Observable<DetalleOrdenRepuesto[]> {
    return this.http.get<DetalleOrdenRepuesto[]>(
      `${this.apiUrl}/por-repuesto/${idRepuesto}`
    );
  }

  /**
   * GET /api/detalle-orden-repuesto/por-cantidad-minima?cantidad=5
   */
  buscarPorCantidadMayorIgual(
    cantidadMinima: number
  ): Observable<DetalleOrdenRepuesto[]> {
    const params = new HttpParams().set('cantidad', cantidadMinima.toString());
    return this.http.get<DetalleOrdenRepuesto[]>(
      `${this.apiUrl}/por-cantidad-minima`,
      { params }
    );
  }

  /**
   * GET /api/detalle-orden-repuesto/creados?inicio=...&fin=...
   *
   * inicio/fin: 'YYYY-MM-DDTHH:mm:ss'
   */
  buscarPorRangoFechasCreacion(
    inicio: string,
    fin: string
  ): Observable<DetalleOrdenRepuesto[]> {
    const params = new HttpParams().set('inicio', inicio).set('fin', fin);
    return this.http.get<DetalleOrdenRepuesto[]>(`${this.apiUrl}/creados`, {
      params,
    });
  }

  // ================== ESTADÍSTICAS / REPORTES ==================

  /**
   * GET /api/detalle-orden-repuesto/estadisticas/resumen-por-orden
   * DTO: { idOrdenTrabajo, cantidadTotal, totalRepuestos }
   */
  obtenerResumenRepuestosPorOrden(): Observable<ResumenRepuestosPorOrdenDTO[]> {
    return this.http.get<ResumenRepuestosPorOrdenDTO[]>(
      `${this.apiUrl}/estadisticas/resumen-por-orden`
    );
  }

  /**
   * GET /api/detalle-orden-repuesto/estadisticas/repuestos-mas-utilizados
   * DTO: { idRepuesto, nombreRepuesto, cantidadTotal, totalRepuestos }
   */
  obtenerRepuestosMasUtilizados(): Observable<RepuestoMasUtilizadoDTO[]> {
    return this.http.get<RepuestoMasUtilizadoDTO[]>(
      `${this.apiUrl}/estadisticas/repuestos-mas-utilizados`
    );
  }

  /**
   * GET /api/detalle-orden-repuesto/estadisticas/consumo-por-cliente?inicio=YYYY-MM-DD&fin=YYYY-MM-DD
   * DTO: { idCliente, nombreCliente, cantidadTotal, totalRepuestos }
   */
  obtenerConsumoRepuestosPorClienteEnRangoFechas(
    inicio: string,
    fin: string
  ): Observable<ConsumoRepuestosClienteDTO[]> {
    const params = new HttpParams().set('inicio', inicio).set('fin', fin);

    return this.http.get<ConsumoRepuestosClienteDTO[]>(
      `${this.apiUrl}/estadisticas/consumo-por-cliente`,
      { params }
    );
  }
}
