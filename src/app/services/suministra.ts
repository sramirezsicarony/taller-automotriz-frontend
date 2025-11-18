// src/app/services/suministra.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import {
  Suministra,
  SuministraCreatePayload,
  SuministraUpdatePayload,
  SuministraResumenComprasProveedorReporte,
  SuministraResumenComprasRepuestoReporte,
  SuministraComprasProveedorRangoReporte,
} from '../models/suministra';

@Injectable({
  providedIn: 'root',
})
export class SuministraService {
  private readonly apiUrl = 'http://localhost:8080/api/suministros';

  constructor(private http: HttpClient) {}

  // ====================== CRUD BÁSICO ======================

  /**
   * GET /api/suministros
   */
  getAll(): Observable<Suministra[]> {
    return this.http.get<Suministra[]>(this.apiUrl);
  }

  /**
   * GET /api/suministros/{idProveedor}/{idRepuesto}
   */
  getById(idProveedor: number, idRepuesto: number): Observable<Suministra> {
    return this.http.get<Suministra>(
      `${this.apiUrl}/${idProveedor}/${idRepuesto}`
    );
  }

  /**
   * POST /api/suministros
   *
   * El backend espera:
   * {
   *   "proveedor": { "idProveedor": 1 },
   *   "repuesto": { "idRepuesto": 10 },
   *   "costoUnitario": ...,
   *   "cantidad": ...,
   *   "costoTotal": ...,
   *   "fechaIngreso": "YYYY-MM-DD"
   * }
   *
   * Transformamos el payload plano a la estructura esperada.
   */
  create(payload: SuministraCreatePayload): Observable<Suministra> {
    const body = {
      proveedor: { idProveedor: payload.idProveedor },
      repuesto: { idRepuesto: payload.idRepuesto },
      costoUnitario: payload.costoUnitario,
      cantidad: payload.cantidad,
      costoTotal: payload.costoTotal,
      fechaIngreso: payload.fechaIngreso,
    };

    return this.http.post<Suministra>(this.apiUrl, body);
  }

  /**
   * PUT /api/suministros/{idProveedor}/{idRepuesto}
   *
   * La PK viene por path; en el body no hace falta enviar proveedor/repuesto.
   */
  update(
    idProveedor: number,
    idRepuesto: number,
    payload: SuministraUpdatePayload
  ): Observable<Suministra> {
    const body = {
      costoUnitario: payload.costoUnitario,
      cantidad: payload.cantidad,
      costoTotal: payload.costoTotal,
      fechaIngreso: payload.fechaIngreso,
    };

    return this.http.put<Suministra>(
      `${this.apiUrl}/${idProveedor}/${idRepuesto}`,
      body
    );
  }

  /**
   * DELETE /api/suministros/{idProveedor}/{idRepuesto}
   */
  delete(idProveedor: number, idRepuesto: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${idProveedor}/${idRepuesto}`
    );
  }

  // ================== CONSULTAS SIMPLES / INTERMEDIAS ==================

  /**
   * GET /api/suministros/por-proveedor/{idProveedor}
   */
  listarPorIdProveedor(idProveedor: number): Observable<Suministra[]> {
    return this.http.get<Suministra[]>(
      `${this.apiUrl}/por-proveedor/${idProveedor}`
    );
  }

  /**
   * GET /api/suministros/por-repuesto/{idRepuesto}
   */
  listarPorIdRepuesto(idRepuesto: number): Observable<Suministra[]> {
    return this.http.get<Suministra[]>(
      `${this.apiUrl}/por-repuesto/${idRepuesto}`
    );
  }

  /**
   * GET /api/suministros/por-fecha-ingreso?inicio=YYYY-MM-DD&fin=YYYY-MM-DD
   */
  buscarPorRangoFechaIngreso(
    inicio: string,
    fin: string
  ): Observable<Suministra[]> {
    const params = new HttpParams().set('inicio', inicio).set('fin', fin);
    return this.http.get<Suministra[]>(
      `${this.apiUrl}/por-fecha-ingreso`,
      { params }
    );
  }

  /**
   * GET /api/suministros/por-costo-unitario?min=10000&max=50000
   */
  buscarPorRangoCostoUnitario(
    costoMin: number,
    costoMax: number
  ): Observable<Suministra[]> {
    const params = new HttpParams()
      .set('min', String(costoMin))
      .set('max', String(costoMax));

    return this.http.get<Suministra[]>(
      `${this.apiUrl}/por-costo-unitario`,
      { params }
    );
  }

  /**
   * GET /api/suministros/por-cantidad?min=50
   */
  buscarPorCantidadMayorIgual(
    cantidadMinima: number
  ): Observable<Suministra[]> {
    const params = new HttpParams().set('min', String(cantidadMinima));
    return this.http.get<Suministra[]>(
      `${this.apiUrl}/por-cantidad`,
      { params }
    );
  }

  /**
   * GET /api/suministros/creados?inicio=YYYY-MM-DDTHH:mm:ss&fin=YYYY-MM-DDTHH:mm:ss
   */
  buscarPorRangoFechasCreacion(
    inicio: string,
    fin: string
  ): Observable<Suministra[]> {
    const params = new HttpParams().set('inicio', inicio).set('fin', fin);
    return this.http.get<Suministra[]>(`${this.apiUrl}/creados`, { params });
  }

  // ================== CONSULTAS COMPLEJAS / ESTADÍSTICAS ==================

  /**
   * GET /api/suministros/estadisticas/compras-por-proveedor
   *
   * Devuelve List<Object[]>:
   * [idProveedor, nombreProveedor, cantidadTotal, costoTotal]
   */
  obtenerResumenComprasPorProveedor(): Observable<SuministraResumenComprasProveedorReporte[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/estadisticas/compras-por-proveedor`)
      .pipe(
        map((rows) =>
          rows.map(
            (r) =>
              ({
                idProveedor: Number(r[0]),
                nombreProveedor: String(r[1]),
                cantidadTotal: Number(r[2] ?? 0),
                costoTotal: Number(r[3] ?? 0),
              } as SuministraResumenComprasProveedorReporte)
          )
        )
      );
  }

  /**
   * GET /api/suministros/estadisticas/compras-por-repuesto
   *
   * Devuelve List<Object[]>:
   * [idRepuesto, nombreRepuesto, cantidadTotal, costoTotal]
   */
  obtenerResumenComprasPorRepuesto(): Observable<SuministraResumenComprasRepuestoReporte[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/estadisticas/compras-por-repuesto`)
      .pipe(
        map((rows) =>
          rows.map(
            (r) =>
              ({
                idRepuesto: Number(r[0]),
                nombreRepuesto: String(r[1]),
                cantidadTotal: Number(r[2] ?? 0),
                costoTotal: Number(r[3] ?? 0),
              } as SuministraResumenComprasRepuestoReporte)
          )
        )
      );
  }

  /**
   * GET /api/suministros/estadisticas/compras-por-proveedor-rango?inicio=YYYY-MM-DD&fin=YYYY-MM-DD
   *
   * Devuelve List<Object[]>:
   * [idProveedor, nombreProveedor, cantidadTotal, costoTotal]
   */
  obtenerComprasPorProveedorEnRangoFechas(
    inicio: string,
    fin: string
  ): Observable<SuministraComprasProveedorRangoReporte[]> {
    const params = new HttpParams().set('inicio', inicio).set('fin', fin);

    return this.http
      .get<any[]>(`${this.apiUrl}/estadisticas/compras-por-proveedor-rango`, {
        params,
      })
      .pipe(
        map((rows) =>
          rows.map(
            (r) =>
              ({
                idProveedor: Number(r[0]),
                nombreProveedor: String(r[1]),
                cantidadTotal: Number(r[2] ?? 0),
                costoTotal: Number(r[3] ?? 0),
              } as SuministraComprasProveedorRangoReporte)
          )
        )
      );
  }
}
