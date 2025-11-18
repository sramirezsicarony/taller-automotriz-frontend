// src/app/services/especialidad.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Especialidad,
  EspecialidadCreatePayload,
  MecanicosPorEspecialidadEstadistica,
  CostoManoObraPorEspecialidadEstadistica
} from '../models/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private readonly apiUrl = 'http://localhost:8080/api/especialidades';

  constructor(private http: HttpClient) {}

  // ================== CRUD BÁSICO ==================

  getAll(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(this.apiUrl);
  }

  getById(id: number): Observable<Especialidad> {
    return this.http.get<Especialidad>(`${this.apiUrl}/${id}`);
  }

  create(payload: EspecialidadCreatePayload): Observable<Especialidad> {
    // El backend genera idEspecialidad (IDENTITY)
    return this.http.post<Especialidad>(this.apiUrl, payload);
  }

  update(id: number, payload: EspecialidadCreatePayload): Observable<Especialidad> {
    return this.http.put<Especialidad>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ============ CONSULTAS SIMPLES / INTERMEDIAS ============

  /**
   * GET /api/especialidades/buscar/nombre-exacto?nombre=...
   */
  getByNombreExacto(nombre: string): Observable<Especialidad> {
    const params = new HttpParams().set('nombre', nombre);
    return this.http.get<Especialidad>(`${this.apiUrl}/buscar/nombre-exacto`, { params });
  }

  /**
   * GET /api/especialidades/buscar/nombre-contiene?texto=...
   */
  buscarPorNombreConteniendo(texto: string): Observable<Especialidad[]> {
    const params = new HttpParams().set('texto', texto);
    return this.http.get<Especialidad[]>(`${this.apiUrl}/buscar/nombre-contiene`, { params });
  }

  /**
   * GET /api/especialidades/creadas?inicio=2025-01-01T00:00:00&fin=2025-12-31T23:59:59
   *
   * Debes pasar las fechas ya formateadas como ISO-8601:
   * yyyy-MM-ddTHH:mm:ss (ej: "2025-01-01T00:00:00")
   */
  buscarPorRangoFechasCreacion(inicio: string, fin: string): Observable<Especialidad[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<Especialidad[]>(`${this.apiUrl}/creadas`, { params });
  }

  /**
   * GET /api/especialidades/ordenadas/nombre
   */
  listarOrdenadasPorNombre(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(`${this.apiUrl}/ordenadas/nombre`);
  }

  // ============ ESTADÍSTICAS / REPORTES ============

  /**
   * GET /api/especialidades/estadisticas/mecanicos-por-especialidad
   * Devuelve:
   * [
   *   { idEspecialidad, nombreEspecialidad, cantidadMecanicos },
   *   ...
   * ]
   */
  contarMecanicosPorEspecialidad(): Observable<MecanicosPorEspecialidadEstadistica[]> {
    return this.http.get<MecanicosPorEspecialidadEstadistica[]>(
      `${this.apiUrl}/estadisticas/mecanicos-por-especialidad`
    );
  }

  /**
   * GET /api/especialidades/sin-mecanicos
   */
  listarEspecialidadesSinMecanicos(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(`${this.apiUrl}/sin-mecanicos`);
  }

  /**
   * GET /api/especialidades/estadisticas/costo-mano-obra?inicio=...&fin=...
   *
   * inicio / fin también en formato ISO-8601 (yyyy-MM-ddTHH:mm:ss)
   */
  obtenerCostoTotalManoObraPorEspecialidadEnRangoFechas(
    inicio: string,
    fin: string
  ): Observable<CostoManoObraPorEspecialidadEstadistica[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<CostoManoObraPorEspecialidadEstadistica[]>(
      `${this.apiUrl}/estadisticas/costo-mano-obra`,
      { params }
    );
  }
}
