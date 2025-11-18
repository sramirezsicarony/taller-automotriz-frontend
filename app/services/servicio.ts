// src/app/services/servicio.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Servicio,
  ServicioCreatePayload,
  ServicioEjecucionesEstadistica,
  UsoServicioEstadistica
} from '../models/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private readonly apiUrl = 'http://localhost:8080/api/servicios';

  constructor(private http: HttpClient) {}

  // ================== CRUD BÁSICO ==================

  /**
   * GET /api/servicios
   */
  getAll(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.apiUrl);
  }

  /**
   * GET /api/servicios/{idServicio}
   */
  getById(idServicio: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.apiUrl}/${idServicio}`);
  }

  /**
   * POST /api/servicios
   *
   * Body ejemplo:
   * {
   *   "servicio": "Cambio de aceite",
   *   "descripcion": "Cambio de aceite de motor y filtro"
   * }
   */
  create(payload: ServicioCreatePayload): Observable<Servicio> {
    return this.http.post<Servicio>(this.apiUrl, payload);
  }

  /**
   * PUT /api/servicios/{idServicio}
   */
  update(idServicio: number, payload: ServicioCreatePayload): Observable<Servicio> {
    return this.http.put<Servicio>(`${this.apiUrl}/${idServicio}`, payload);
  }

  /**
   * DELETE /api/servicios/{idServicio}
   */
  delete(idServicio: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idServicio}`);
  }

  // ============ CONSULTAS SIMPLES / INTERMEDIAS ============

  /**
   * GET /api/servicios/por-nombre?nombre=Cambio%20de%20aceite
   */
  getByNombreExacto(nombreServicio: string): Observable<Servicio> {
    const params = new HttpParams().set('nombre', nombreServicio);
    return this.http.get<Servicio>(`${this.apiUrl}/por-nombre`, { params });
  }

  /**
   * GET /api/servicios/buscar?texto=aceite
   */
  buscarPorNombreConteniendo(texto: string): Observable<Servicio[]> {
    const params = new HttpParams().set('texto', texto);
    return this.http.get<Servicio[]>(`${this.apiUrl}/buscar`, { params });
  }

  /**
   * GET /api/servicios/creados?inicio=2025-01-01T00:00:00&fin=2025-12-31T23:59:59
   *
   * inicio / fin en formato ISO-8601 con hora: "yyyy-MM-ddTHH:mm:ss"
   */
  buscarPorRangoFechasCreacion(inicio: string, fin: string): Observable<Servicio[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<Servicio[]>(`${this.apiUrl}/creados`, { params });
  }

  /**
   * GET /api/servicios/ordenados
   */
  listarOrdenadosPorNombre(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiUrl}/ordenados`);
  }

  /**
   * GET /api/servicios/nunca-ejecutados
   */
  listarServiciosNuncaEjecutados(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.apiUrl}/nunca-ejecutados`);
  }

  // ============ ESTADÍSTICAS / REPORTES ============

  /**
   * GET /api/servicios/estadisticas/ejecuciones
   *
   * Devuelve:
   * [
   *   { idServicio, nombreServicio, cantidadEjecuciones },
   *   ...
   * ]
   */
  contarEjecucionesPorServicio(): Observable<ServicioEjecucionesEstadistica[]> {
    return this.http.get<ServicioEjecucionesEstadistica[]>(
      `${this.apiUrl}/estadisticas/ejecuciones`
    );
  }

  /**
   * GET /api/servicios/estadisticas/uso?inicio=2025-01-01&fin=2025-12-31
   *
   * inicio / fin en formato "yyyy-MM-dd" (LocalDate)
   */
  obtenerUsoDeServiciosEnRangoFechas(
    inicio: string,
    fin: string
  ): Observable<UsoServicioEstadistica[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<UsoServicioEstadistica[]>(
      `${this.apiUrl}/estadisticas/uso`,
      { params }
    );
  }
}
