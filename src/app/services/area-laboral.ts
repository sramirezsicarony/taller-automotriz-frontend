// src/app/services/area-laboral.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AreaLaboral,
  AreaLaboralCreatePayload,
  AreaLaboralMecanicosEstadistica,
  AreaLaboralHorasEstadistica
} from '../models/area-laboral';

@Injectable({
  providedIn: 'root'
})
export class AreaLaboralService {

  private readonly apiUrl = 'http://localhost:8080/api/areas-laborales';

  constructor(private http: HttpClient) {}

  // ================== CRUD BÁSICO ==================

  getAll(): Observable<AreaLaboral[]> {
    return this.http.get<AreaLaboral[]>(this.apiUrl);
  }

  getById(idAreaLaboral: number): Observable<AreaLaboral> {
    return this.http.get<AreaLaboral>(`${this.apiUrl}/${idAreaLaboral}`);
  }

  create(payload: AreaLaboralCreatePayload): Observable<AreaLaboral> {
    // El id lo genera la BD (IDENTITY)
    return this.http.post<AreaLaboral>(this.apiUrl, payload);
  }

  update(idAreaLaboral: number, payload: AreaLaboralCreatePayload): Observable<AreaLaboral> {
    return this.http.put<AreaLaboral>(`${this.apiUrl}/${idAreaLaboral}`, payload);
  }

  delete(idAreaLaboral: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idAreaLaboral}`);
  }

  // ============ CONSULTAS SIMPLES / INTERMEDIAS ============

  /**
   * GET /api/areas-laborales/por-nombre?nombre=Latoneria
   */
  getByNombreExacto(nombreArea: string): Observable<AreaLaboral> {
    const params = new HttpParams().set('nombre', nombreArea);
    return this.http.get<AreaLaboral>(`${this.apiUrl}/por-nombre`, { params });
  }

  /**
   * GET /api/areas-laborales/buscar?texto=meca
   */
  buscarPorNombreConteniendo(texto: string): Observable<AreaLaboral[]> {
    const params = new HttpParams().set('texto', texto);
    return this.http.get<AreaLaboral[]>(`${this.apiUrl}/buscar`, { params });
  }

  /**
   * GET /api/areas-laborales/creadas?inicio=2025-01-01T00:00:00&fin=2025-12-31T23:59:59
   *
   * inicio / fin en formato ISO: "yyyy-MM-ddTHH:mm:ss"
   */
  buscarPorRangoFechasCreacion(inicio: string, fin: string): Observable<AreaLaboral[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<AreaLaboral[]>(`${this.apiUrl}/creadas`, { params });
  }

  /**
   * GET /api/areas-laborales/ordenadas
   */
  listarOrdenadasPorNombre(): Observable<AreaLaboral[]> {
    return this.http.get<AreaLaboral[]>(`${this.apiUrl}/ordenadas`);
  }

  // ============ ESTADÍSTICAS / REPORTES ============

  /**
   * GET /api/areas-laborales/estadisticas/mecanicos-por-area
   * Devuelve:
   * [
   *   { idAreaLaboral, nombreArea, cantidadMecanicos },
   *   ...
   * ]
   */
  contarMecanicosPorAreaLaboral(): Observable<AreaLaboralMecanicosEstadistica[]> {
    return this.http.get<AreaLaboralMecanicosEstadistica[]>(
      `${this.apiUrl}/estadisticas/mecanicos-por-area`
    );
  }

  /**
   * GET /api/areas-laborales/sin-mecanicos
   */
  listarAreasSinMecanicos(): Observable<AreaLaboral[]> {
    return this.http.get<AreaLaboral[]>(`${this.apiUrl}/sin-mecanicos`);
  }

  /**
   * GET /api/areas-laborales/estadisticas/horas-por-area?inicio=...&fin=...
   *
   * inicio / fin también en formato ISO-8601 (yyyy-MM-ddTHH:mm:ss)
   */
  obtenerHorasTotalesPorAreaEnRangoFechas(
    inicio: string,
    fin: string
  ): Observable<AreaLaboralHorasEstadistica[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<AreaLaboralHorasEstadistica[]>(
      `${this.apiUrl}/estadisticas/horas-por-area`,
      { params }
    );
  }
}
