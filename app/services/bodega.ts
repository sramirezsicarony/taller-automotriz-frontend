// src/app/services/bodega.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import {
  Bodega,
  BodegaCreatePayload,
  BodegaUpdatePayload,
  BodegaStockPorAlmacenReporte,
  BodegaStockPorRepuestoReporte,
  BodegaRepuestoStockBajoReporte,
} from '../models/bodega';

@Injectable({
  providedIn: 'root',
})
export class BodegaService {
  private readonly apiUrl = 'http://localhost:8080/api/bodega';

  constructor(private http: HttpClient) {}

  // ================== CRUD BÁSICO ==================

  /**
   * GET /api/bodega
   */
  getAll(): Observable<Bodega[]> {
    return this.http.get<Bodega[]>(this.apiUrl);
  }

  /**
   * GET /api/bodega/{idAlmacen}/{idRepuesto}
   */
  getById(idAlmacen: number, idRepuesto: number): Observable<Bodega> {
    return this.http.get<Bodega>(`${this.apiUrl}/${idAlmacen}/${idRepuesto}`);
  }

  /**
   * POST /api/bodega
   *
   * Body:
   * {
   *   "almacen": { "idAlmacen": 1 },
   *   "repuesto": { "idRepuesto": 10 },
   *   "stock": 50,
   *   "precioVenta": 123000.50
   * }
   */
  create(payload: BodegaCreatePayload): Observable<Bodega> {
    return this.http.post<Bodega>(this.apiUrl, payload);
  }

  /**
   * PUT /api/bodega/{idAlmacen}/{idRepuesto}
   *
   * Solo actualiza stock y precioVenta.
   */
  update(
    idAlmacen: number,
    idRepuesto: number,
    payload: BodegaUpdatePayload
  ): Observable<Bodega> {
    return this.http.put<Bodega>(
      `${this.apiUrl}/${idAlmacen}/${idRepuesto}`,
      payload
    );
  }

  /**
   * DELETE /api/bodega/{idAlmacen}/{idRepuesto}
   */
  delete(idAlmacen: number, idRepuesto: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${idAlmacen}/${idRepuesto}`
    );
  }

  // ================== CONSULTAS SIMPLES / INTERMEDIAS ==================

  /**
   * GET /api/bodega/por-almacen/{idAlmacen}
   */
  listarPorIdAlmacen(idAlmacen: number): Observable<Bodega[]> {
    return this.http.get<Bodega[]>(`${this.apiUrl}/por-almacen/${idAlmacen}`);
  }

  /**
   * GET /api/bodega/por-stock-minimo?stockMinimo=10
   */
  buscarPorStockMayorIgual(stockMinimo: number): Observable<Bodega[]> {
    const params = new HttpParams().set('stockMinimo', stockMinimo);
    return this.http.get<Bodega[]>(`${this.apiUrl}/por-stock-minimo`, {
      params,
    });
  }

  /**
   * GET /api/bodega/por-rango-precio?min=10000&max=50000
   */
  buscarPorRangoPrecioVenta(
    precioMin: number,
    precioMax: number
  ): Observable<Bodega[]> {
    const params = new HttpParams()
      .set('min', precioMin)
      .set('max', precioMax);

    return this.http.get<Bodega[]>(`${this.apiUrl}/por-rango-precio`, {
      params,
    });
  }

  /**
   * GET /api/bodega/creados?inicio=2025-01-01T00:00:00&fin=2025-12-31T23:59:59
   *
   * inicio / fin en formato ISO 'YYYY-MM-DDTHH:mm:ss'
   */
  buscarPorRangoFechasCreacion(
    inicio: string,
    fin: string
  ): Observable<Bodega[]> {
    const params = new HttpParams().set('inicio', inicio).set('fin', fin);
    return this.http.get<Bodega[]>(`${this.apiUrl}/creados`, { params });
  }

  // ================== CONSULTAS COMPLEJAS / ESTADÍSTICAS ==================

  /**
   * GET /api/bodega/estadisticas/por-almacen
   *
   * List<Object[]>:
   *  [idAlmacen, nombreAlmacen, stockTotal, valorTotal]
   */
  obtenerStockYValorTotalPorAlmacen(): Observable<BodegaStockPorAlmacenReporte[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/estadisticas/por-almacen`)
      .pipe(
        map((rows) =>
          rows.map(
            (r) =>
              ({
                idAlmacen: Number(r[0]),
                nombreAlmacen: String(r[1]),
                stockTotal: Number(r[2] ?? 0),
                valorTotal: Number(r[3] ?? 0),
              } as BodegaStockPorAlmacenReporte)
          )
        )
      );
  }

  /**
   * GET /api/bodega/estadisticas/por-repuesto-global
   *
   * List<Object[]>:
   *  [idRepuesto, nombreRepuesto, stockTotal, valorTotal]
   */
  obtenerStockYValorTotalPorRepuestoGlobal(): Observable<BodegaStockPorRepuestoReporte[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/estadisticas/por-repuesto-global`)
      .pipe(
        map((rows) =>
          rows.map(
            (r) =>
              ({
                idRepuesto: Number(r[0]),
                nombreRepuesto: String(r[1]),
                stockTotal: Number(r[2] ?? 0),
                valorTotal: Number(r[3] ?? 0),
              } as BodegaStockPorRepuestoReporte)
          )
        )
      );
  }

  /**
   * GET /api/bodega/estadisticas/repuestos-stock-bajo?umbral=20
   *
   * List<Object[]>:
   *  [idRepuesto, nombreRepuesto, stockTotal]
   */
  obtenerRepuestosConStockGlobalBajo(
    umbral: number
  ): Observable<BodegaRepuestoStockBajoReporte[]> {
    const params = new HttpParams().set('umbral', umbral);

    return this.http
      .get<any[]>(`${this.apiUrl}/estadisticas/repuestos-stock-bajo`, {
        params,
      })
      .pipe(
        map((rows) =>
          rows.map(
            (r) =>
              ({
                idRepuesto: Number(r[0]),
                nombreRepuesto: String(r[1]),
                stockTotal: Number(r[2] ?? 0),
              } as BodegaRepuestoStockBajoReporte)
          )
        )
      );
  }
}
