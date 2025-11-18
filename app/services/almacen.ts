// src/app/services/almacen.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import {
  Almacen,
  AlmacenCreatePayload,
  AlmacenResumenReporte,
  AlmacenInventarioReporte,
} from '../models/almacen';

@Injectable({
  providedIn: 'root',
})
export class AlmacenService {
  private readonly apiUrl = 'http://localhost:8080/api/almacenes';

  constructor(private http: HttpClient) {}

  // ================== CRUD BÁSICO ==================

  /**
   * GET /api/almacenes
   */
  getAll(): Observable<Almacen[]> {
    return this.http.get<Almacen[]>(this.apiUrl);
  }

  /**
   * GET /api/almacenes/{id}
   */
  getById(idAlmacen: number): Observable<Almacen> {
    return this.http.get<Almacen>(`${this.apiUrl}/${idAlmacen}`);
  }

  /**
   * POST /api/almacenes
   *
   * El backend genera idAlmacen, createdAt, updatedAt.
   */
  create(payload: AlmacenCreatePayload): Observable<Almacen> {
    return this.http.post<Almacen>(this.apiUrl, payload);
  }

  /**
   * PUT /api/almacenes/{id}
   */
  update(
    idAlmacen: number,
    payload: AlmacenCreatePayload
  ): Observable<Almacen> {
    return this.http.put<Almacen>(`${this.apiUrl}/${idAlmacen}`, payload);
  }

  /**
   * DELETE /api/almacenes/{id}
   */
  delete(idAlmacen: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idAlmacen}`);
  }

  // ================== CONSULTAS SIMPLES / INTERMEDIAS ==================

  /**
   * GET /api/almacenes/por-nombre?nombre=Central
   */
  obtenerPorNombre(nombre: string): Observable<Almacen> {
    const params = new HttpParams().set('nombre', nombre);
    return this.http.get<Almacen>(`${this.apiUrl}/por-nombre`, { params });
  }

  /**
   * GET /api/almacenes/buscar-por-nombre?texto=centro
   */
  buscarPorNombreConteniendo(texto: string): Observable<Almacen[]> {
    const params = new HttpParams().set('texto', texto);
    return this.http.get<Almacen[]>(
      `${this.apiUrl}/buscar-por-nombre`,
      { params }
    );
  }

  /**
   * GET /api/almacenes/buscar-por-direccion?texto=carrera
   */
  buscarPorDireccionConteniendo(texto: string): Observable<Almacen[]> {
    const params = new HttpParams().set('texto', texto);
    return this.http.get<Almacen[]>(
      `${this.apiUrl}/buscar-por-direccion`,
      { params }
    );
  }

  /**
   * GET /api/almacenes/creados?inicio=2025-01-01T00:00:00&fin=2025-12-31T23:59:59
   *
   * inicio / fin deben ir en formato ISO: 'YYYY-MM-DDTHH:mm:ss'
   */
  buscarPorRangoFechasCreacion(
    inicio: string,
    fin: string
  ): Observable<Almacen[]> {
    const params = new HttpParams().set('inicio', inicio).set('fin', fin);
    return this.http.get<Almacen[]>(`${this.apiUrl}/creados`, { params });
  }

  // ================== CONSULTAS COMPLEJAS / ESTADÍSTICAS ==================

  /**
   * GET /api/almacenes/estadisticas/resumen-stock
   *
   * Backend devuelve List<Object[]>:
   *  [idAlmacen, nombreAlmacen, cantidadRepuestos, stockTotal]
   */
  obtenerResumenRepuestosYStockPorAlmacen(): Observable<AlmacenResumenReporte[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/estadisticas/resumen-stock`)
      .pipe(
        map((rows) =>
          rows.map(
            (r) =>
              ({
                idAlmacen: Number(r[0]),
                nombreAlmacen: String(r[1]),
                cantidadRepuestos: Number(r[2] ?? 0),
                stockTotal: Number(r[3] ?? 0),
              } as AlmacenResumenReporte)
          )
        )
      );
  }

  /**
   * GET /api/almacenes/sin-stock
   */
  listarAlmacenesSinStock(): Observable<Almacen[]> {
    return this.http.get<Almacen[]>(`${this.apiUrl}/sin-stock`);
  }

  /**
   * GET /api/almacenes/estadisticas/valor-inventario
   *
   * Backend devuelve List<Object[]>:
   *  [idAlmacen, nombreAlmacen, stockTotal, valorTotal]
   */
  obtenerStockYValorTotalPorAlmacen(): Observable<AlmacenInventarioReporte[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/estadisticas/valor-inventario`)
      .pipe(
        map((rows) =>
          rows.map(
            (r) =>
              ({
                idAlmacen: Number(r[0]),
                nombreAlmacen: String(r[1]),
                stockTotal: Number(r[2] ?? 0),
                valorTotal: Number(r[3] ?? 0),
              } as AlmacenInventarioReporte)
          )
        )
      );
  }
}
