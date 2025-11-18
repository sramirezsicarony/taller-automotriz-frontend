// src/app/services/proveedor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import {
  Proveedor,
  ProveedorCreatePayload,
  ProveedorUpdatePayload,
  ProveedorResumenSuministrosReporte,
  ProveedorCostoTotalReporte,
} from '../models/proveedor';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  private readonly apiUrl = 'http://localhost:8080/api/proveedores';

  constructor(private http: HttpClient) {}

  // ====================== CRUD BÁSICO ======================

  /**
   * GET /api/proveedores
   */
  getAll(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl);
  }

  /**
   * GET /api/proveedores/{idProveedor}
   */
  getById(idProveedor: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.apiUrl}/${idProveedor}`);
  }

  /**
   * POST /api/proveedores
   */
  create(payload: ProveedorCreatePayload): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.apiUrl, payload);
  }

  /**
   * PUT /api/proveedores/{idProveedor}
   */
  update(
    idProveedor: number,
    payload: ProveedorUpdatePayload
  ): Observable<Proveedor> {
    return this.http.put<Proveedor>(
      `${this.apiUrl}/${idProveedor}`,
      payload
    );
  }

  /**
   * DELETE /api/proveedores/{idProveedor}
   */
  delete(idProveedor: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idProveedor}`);
  }

  // ====================== BÚSQUEDAS / FILTROS ======================

  /**
   * GET /api/proveedores/nombre?nombre=ProveedorX
   */
  obtenerPorNombre(nombre: string): Observable<Proveedor> {
    const params = new HttpParams().set('nombre', nombre);
    return this.http.get<Proveedor>(`${this.apiUrl}/nombre`, { params });
  }

  /**
   * GET /api/proveedores/buscar-nombre?texto=auto
   */
  buscarPorNombreConteniendo(texto: string): Observable<Proveedor[]> {
    const params = new HttpParams().set('texto', texto);
    return this.http.get<Proveedor[]>(`${this.apiUrl}/buscar-nombre`, {
      params,
    });
  }

  /**
   * GET /api/proveedores/buscar-direccion?texto=calle
   */
  buscarPorDireccionConteniendo(texto: string): Observable<Proveedor[]> {
    const params = new HttpParams().set('texto', texto);
    return this.http.get<Proveedor[]>(`${this.apiUrl}/buscar-direccion`, {
      params,
    });
  }

  /**
   * GET /api/proveedores/creados?inicio=2025-01-01T00:00:00&fin=2025-12-31T23:59:59
   *
   * inicio / fin deben venir en formato ISO: 'YYYY-MM-DDTHH:mm:ss'
   */
  buscarPorRangoFechasCreacion(
    inicio: string,
    fin: string
  ): Observable<Proveedor[]> {
    const params = new HttpParams().set('inicio', inicio).set('fin', fin);
    return this.http.get<Proveedor[]>(`${this.apiUrl}/creados`, { params });
  }

  // ====================== REPORTES / AGREGADOS ======================

  /**
   * GET /api/proveedores/resumen-suministros
   *
   * List<Object[]>:
   * [idProveedor, nombreProveedor, cantidadTotal, costoTotal]
   */
  obtenerResumenSuministrosPorProveedor(): Observable<ProveedorResumenSuministrosReporte[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/resumen-suministros`)
      .pipe(
        map((rows) =>
          rows.map(
            (r) =>
              ({
                idProveedor: Number(r[0]),
                nombreProveedor: String(r[1]),
                cantidadTotal: Number(r[2] ?? 0),
                costoTotal: Number(r[3] ?? 0),
              } as ProveedorResumenSuministrosReporte)
          )
        )
      );
  }

  /**
   * GET /api/proveedores/sin-suministros
   */
  listarProveedoresSinSuministros(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.apiUrl}/sin-suministros`);
  }

  /**
   * GET /api/proveedores/costo-total?inicio=2025-01-01&fin=2025-12-31
   *
   * List<Object[]>:
   * [idProveedor, nombreProveedor, costoTotal]
   *
   * inicio / fin en formato 'YYYY-MM-DD'
   */
  obtenerCostoTotalPorProveedorEnRangoFechas(
    inicio: string,
    fin: string
  ): Observable<ProveedorCostoTotalReporte[]> {
    const params = new HttpParams().set('inicio', inicio).set('fin', fin);

    return this.http
      .get<any[]>(`${this.apiUrl}/costo-total`, { params })
      .pipe(
        map((rows) =>
          rows.map(
            (r) =>
              ({
                idProveedor: Number(r[0]),
                nombreProveedor: String(r[1]),
                costoTotal: Number(r[2] ?? 0),
              } as ProveedorCostoTotalReporte)
          )
        )
      );
  }
}
