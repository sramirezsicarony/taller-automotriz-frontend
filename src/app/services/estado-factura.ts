
// src/app/services/estado-factura.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  EstadoFactura,
  EstadoFacturaCreatePayload,
  EstadoFacturaUpdatePayload,
  FacturasPorEstadoReporte,
  TotalFacturadoPorEstadoReporte,
} from '../models/estado-factura';

@Injectable({
  providedIn: 'root',
})
export class EstadoFacturaService {
  private readonly apiUrl = 'http://localhost:8080/api/estados-factura';

  constructor(private http: HttpClient) {}

  // ================== CRUD BÁSICO ==================

  /**
   * GET /api/estados-factura
   */
  getAll(): Observable<EstadoFactura[]> {
    return this.http.get<EstadoFactura[]>(this.apiUrl);
  }

  /**
   * GET /api/estados-factura/{id}
   */
  getById(id: number): Observable<EstadoFactura> {
    return this.http.get<EstadoFactura>(`${this.apiUrl}/${id}`);
  }

  /**
   * POST /api/estados-factura
   *
   * Body ejemplo:
   * { "estado": "PAGADA" }
   */
  create(payload: EstadoFacturaCreatePayload): Observable<EstadoFactura> {
    return this.http.post<EstadoFactura>(this.apiUrl, payload);
  }

  /**
   * PUT /api/estados-factura/{id}
   */
  update(id: number, payload: EstadoFacturaUpdatePayload): Observable<EstadoFactura> {
    return this.http.put<EstadoFactura>(`${this.apiUrl}/${id}`, payload);
  }

  /**
   * DELETE /api/estados-factura/{id}
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ================== CONSULTAS SIMPLES / INTERMEDIAS ==================

  /**
   * GET /api/estados-factura/buscar/nombre-exacto?nombre=...
   */
  obtenerPorNombreExacto(nombre: string): Observable<EstadoFactura> {
    const params = new HttpParams().set('nombre', nombre);
    return this.http.get<EstadoFactura>(`${this.apiUrl}/buscar/nombre-exacto`, { params });
  }

  /**
   * GET /api/estados-factura/buscar/nombre-contiene?texto=...
   */
  buscarPorNombreConteniendo(texto: string): Observable<EstadoFactura[]> {
    const params = new HttpParams().set('texto', texto);
    return this.http.get<EstadoFactura[]>(`${this.apiUrl}/buscar/nombre-contiene`, { params });
  }

  /**
   * GET /api/estados-factura/creados?inicio=YYYY-MM-DDTHH:mm:ss&fin=YYYY-MM-DDTHH:mm:ss
   *
   * Ejemplo:
   *  inicio = '2025-01-01T00:00:00'
   *  fin    = '2025-12-31T23:59:59'
   */
  buscarPorRangoFechasCreacion(inicio: string, fin: string): Observable<EstadoFactura[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<EstadoFactura[]>(`${this.apiUrl}/creados`, { params });
  }

  /**
   * GET /api/estados-factura/ordenados/nombre
   */
  listarOrdenadosPorNombre(): Observable<EstadoFactura[]> {
    return this.http.get<EstadoFactura[]>(`${this.apiUrl}/ordenados/nombre`);
  }

  // ================== CONSULTAS COMPLEJAS / ESTADÍSTICAS ==================

  /**
   * GET /api/estados-factura/estadisticas/facturas-por-estado
   */
  contarFacturasPorEstado(): Observable<FacturasPorEstadoReporte[]> {
    return this.http.get<FacturasPorEstadoReporte[]>(
      `${this.apiUrl}/estadisticas/facturas-por-estado`
    );
  }

  /**
   * GET /api/estados-factura/sin-facturas
   */
  listarEstadosSinFacturas(): Observable<EstadoFactura[]> {
    return this.http.get<EstadoFactura[]>(`${this.apiUrl}/sin-facturas`);
  }

  /**
   * GET /api/estados-factura/estadisticas/total-facturado?inicio=YYYY-MM-DD&fin=YYYY-MM-DD
   */
  obtenerTotalFacturadoPorEstadoEnRangoFechas(
    inicio: string,
    fin: string
  ): Observable<TotalFacturadoPorEstadoReporte[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<TotalFacturadoPorEstadoReporte[]>(
      `${this.apiUrl}/estadisticas/total-facturado`,
      { params }
    );
  }
}
