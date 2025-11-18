// src/app/services/repuesto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import {
  Repuesto,
  RepuestoCreatePayload,
  RepuestoStockValorReporte,
  RepuestoVentasReporte,
  RepuestoComprasReporte,
} from '../models/repuesto';

@Injectable({
  providedIn: 'root',
})
export class RepuestoService {
  private readonly apiUrl = 'http://localhost:8080/api/repuestos';

  constructor(private http: HttpClient) {}

  // ====================== CRUD BÁSICO ======================

  /**
   * GET /api/repuestos
   */
  getAll(): Observable<Repuesto[]> {
    return this.http.get<Repuesto[]>(this.apiUrl);
  }

  /**
   * GET /api/repuestos/{idRepuesto}
   */
  getById(idRepuesto: number): Observable<Repuesto> {
    return this.http.get<Repuesto>(`${this.apiUrl}/${idRepuesto}`);
  }

  /**
   * POST /api/repuestos
   *
   * El backend genera idRepuesto y timestamps.
   * Solo debes enviar: nombre, descripcion?, categoria: { idCategoria }
   */
  create(payload: RepuestoCreatePayload): Observable<Repuesto> {
    return this.http.post<Repuesto>(this.apiUrl, payload);
  }

  /**
   * PUT /api/repuestos/{idRepuesto}
   *
   * Solo se actualizan nombre, descripcion y categoria.
   */
  update(
    idRepuesto: number,
    payload: RepuestoCreatePayload
  ): Observable<Repuesto> {
    return this.http.put<Repuesto>(`${this.apiUrl}/${idRepuesto}`, payload);
  }

  /**
   * DELETE /api/repuestos/{idRepuesto}
   */
  delete(idRepuesto: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idRepuesto}`);
  }

  // ====================== BÚSQUEDAS / CONSULTAS ======================

  /**
   * GET /api/repuestos/nombre?nombre=FiltroAceite
   */
  obtenerPorNombre(nombre: string): Observable<Repuesto> {
    const params = new HttpParams().set('nombre', nombre);
    return this.http.get<Repuesto>(`${this.apiUrl}/nombre`, { params });
  }

  /**
   * GET /api/repuestos/buscar?texto=filtro
   */
  buscarPorNombreConteniendo(texto: string): Observable<Repuesto[]> {
    const params = new HttpParams().set('texto', texto);
    return this.http.get<Repuesto[]>(`${this.apiUrl}/buscar`, { params });
  }

  /**
   * GET /api/repuestos/categoria/{idCategoria}
   */
  listarPorCategoria(idCategoria: number): Observable<Repuesto[]> {
    return this.http.get<Repuesto[]>(
      `${this.apiUrl}/categoria/${idCategoria}`
    );
  }

  /**
   * GET /api/repuestos/creados?inicio=2025-01-01T00:00:00&fin=2025-12-31T23:59:59
   *
   * inicio / fin en formato ISO: 'YYYY-MM-DDTHH:mm:ss'
   */
  buscarPorRangoFechasCreacion(
    inicio: string,
    fin: string
  ): Observable<Repuesto[]> {
    const params = new HttpParams().set('inicio', inicio).set('fin', fin);

    return this.http.get<Repuesto[]>(`${this.apiUrl}/creados`, { params });
  }

  // ====================== REPORTES / AGREGADOS ======================

  /**
   * GET /api/repuestos/stock-valor
   * Backend devuelve List<Object[]>:
   *   [idRepuesto, nombreRepuesto, stockTotal, valorTotal]
   * Aquí lo mapeamos a RepuestoStockValorReporte.
   */
  obtenerStockYValorTotalPorRepuesto(): Observable<RepuestoStockValorReporte[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/stock-valor`)
      .pipe(
        map((rows) =>
          rows.map((r) => ({
            idRepuesto: Number(r[0]),
            nombreRepuesto: String(r[1]),
            stockTotal: Number(r[2]),
            valorTotal: Number(r[3]),
          }) as RepuestoStockValorReporte)
        )
      );
  }

  /**
   * GET /api/repuestos/ventas?inicio=2025-01-01T00:00:00&fin=2025-12-31T23:59:59
   *
   * Backend devuelve List<Object[]>:
   *   [idRepuesto, nombreRepuesto, cantidadTotal, totalVendido]
   */
  obtenerVentasPorRepuestoEnRangoFechas(
    inicio: string, // 'YYYY-MM-DDTHH:mm:ss'
    fin: string
  ): Observable<RepuestoVentasReporte[]> {
    const params = new HttpParams().set('inicio', inicio).set('fin', fin);

    return this.http
      .get<any[]>(`${this.apiUrl}/ventas`, { params })
      .pipe(
        map((rows) =>
          rows.map((r) => ({
            idRepuesto: Number(r[0]),
            nombreRepuesto: String(r[1]),
            cantidadTotal: Number(r[2]),
            totalVendido: Number(r[3]),
          }) as RepuestoVentasReporte)
        )
      );
  }

  /**
   * GET /api/repuestos/compras?inicio=2025-01-01&fin=2025-12-31
   *
   * Backend devuelve List<Object[]>:
   *   [idRepuesto, nombreRepuesto, cantidadComprada, costoTotalCompras]
   */
  obtenerComprasPorRepuestoEnRangoFechas(
    inicio: string, // 'YYYY-MM-DD'
    fin: string
  ): Observable<RepuestoComprasReporte[]> {
    const params = new HttpParams().set('inicio', inicio).set('fin', fin);

    return this.http
      .get<any[]>(`${this.apiUrl}/compras`, { params })
      .pipe(
        map((rows) =>
          rows.map((r) => ({
            idRepuesto: Number(r[0]),
            nombreRepuesto: String(r[1]),
            cantidadComprada: Number(r[2]),
            costoTotalCompras: Number(r[3]),
          }) as RepuestoComprasReporte)
        )
      );
  }
}
