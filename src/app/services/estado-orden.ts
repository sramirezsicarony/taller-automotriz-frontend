// src/app/services/estado-orden.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  EstadoOrden,
  EstadoOrdenCreatePayload,
  OrdenesPorEstadoEstadistica,
  PromedioDiasPorEstadoEstadistica
} from '../models/estado-orden';

@Injectable({
  providedIn: 'root'
})
export class EstadoOrdenService {

  private readonly apiUrl = 'http://localhost:8080/api/estados-orden';

  constructor(private http: HttpClient) {}

  // ================== CRUD BÁSICO ==================

  /**
   * GET /api/estados-orden
   */
  getAll(): Observable<EstadoOrden[]> {
    return this.http.get<EstadoOrden[]>(this.apiUrl);
  }

  /**
   * GET /api/estados-orden/{id}
   */
  getById(idEstadoOrden: number): Observable<EstadoOrden> {
    return this.http.get<EstadoOrden>(`${this.apiUrl}/${idEstadoOrden}`);
  }

  /**
   * POST /api/estados-orden
   *
   * Body:
   * {
   *   "estado": "EN_PROCESO"
   * }
   */
  create(payload: EstadoOrdenCreatePayload): Observable<EstadoOrden> {
    return this.http.post<EstadoOrden>(this.apiUrl, payload);
  }

  /**
   * PUT /api/estados-orden/{id}
   */
  update(idEstadoOrden: number, payload: EstadoOrdenCreatePayload): Observable<EstadoOrden> {
    return this.http.put<EstadoOrden>(`${this.apiUrl}/${idEstadoOrden}`, payload);
  }

  /**
   * DELETE /api/estados-orden/{id}
   */
  delete(idEstadoOrden: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idEstadoOrden}`);
  }

  // ======== CONSULTAS SIMPLES / INTERMEDIAS ========

  /**
   * GET /api/estados-orden/buscar/nombre-exacto?nombre=...
   */
  getByNombreExacto(nombreEstado: string): Observable<EstadoOrden> {
    const params = new HttpParams().set('nombre', nombreEstado);
    return this.http.get<EstadoOrden>(`${this.apiUrl}/buscar/nombre-exacto`, { params });
  }

  /**
   * GET /api/estados-orden/buscar/nombre-contiene?texto=...
   */
  buscarPorNombreConteniendo(texto: string): Observable<EstadoOrden[]> {
    const params = new HttpParams().set('texto', texto);
    return this.http.get<EstadoOrden[]>(`${this.apiUrl}/buscar/nombre-contiene`, { params });
  }

  /**
   * GET /api/estados-orden/creados?inicio=2025-01-01T00:00:00&fin=2025-12-31T23:59:59
   *
   * inicio / fin en formato ISO-8601 con hora: "yyyy-MM-ddTHH:mm:ss"
   */
  buscarPorRangoFechasCreacion(inicio: string, fin: string): Observable<EstadoOrden[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<EstadoOrden[]>(`${this.apiUrl}/creados`, { params });
  }

  /**
   * GET /api/estados-orden/ordenados/nombre
   */
  listarOrdenadosPorNombre(): Observable<EstadoOrden[]> {
    return this.http.get<EstadoOrden[]>(`${this.apiUrl}/ordenados/nombre`);
  }

  /**
   * GET /api/estados-orden/sin-ordenes
   */
  listarEstadosSinOrdenes(): Observable<EstadoOrden[]> {
    return this.http.get<EstadoOrden[]>(`${this.apiUrl}/sin-ordenes`);
  }

  // ============ ESTADÍSTICAS / REPORTES ============

  /**
   * GET /api/estados-orden/estadisticas/ordenes-por-estado
   *
   * Devuelve:
   * [
   *   { idEstadoOrden, nombreEstado, cantidadOrdenes },
   *   ...
   * ]
   */
  contarOrdenesPorEstado(): Observable<OrdenesPorEstadoEstadistica[]> {
    return this.http.get<OrdenesPorEstadoEstadistica[]>(
      `${this.apiUrl}/estadisticas/ordenes-por-estado`
    );
  }

  /**
   * GET /api/estados-orden/estadisticas/promedio-dias
   *
   * Sin rango de fechas, todas las órdenes con fecha_ingreso y fecha_salida.
   */
  obtenerPromedioDiasPorEstado(): Observable<PromedioDiasPorEstadoEstadistica[]> {
    return this.http.get<PromedioDiasPorEstadoEstadistica[]>(
      `${this.apiUrl}/estadisticas/promedio-dias`
    );
  }

  /**
   * GET /api/estados-orden/estadisticas/promedio-dias-rango?inicio=2025-01-01&fin=2025-01-31
   *
   * inicio / fin en formato "yyyy-MM-dd" (LocalDate)
   */
  obtenerPromedioDiasPorEstadoEnRango(
    inicio: string,
    fin: string
  ): Observable<PromedioDiasPorEstadoEstadistica[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<PromedioDiasPorEstadoEstadistica[]>(
      `${this.apiUrl}/estadisticas/promedio-dias-rango`,
      { params }
    );
  }
}
