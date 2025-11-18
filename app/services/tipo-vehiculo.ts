// src/app/services/tipo-vehiculo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  TipoVehiculo,
  TipoVehiculoCreatePayload,
  TipoVehiculoEstadistica
} from '../models/tipo-vehiculo';

@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoService {

  private readonly apiUrl = 'http://localhost:8080/api/tipos-vehiculo';

  constructor(private http: HttpClient) {}

  // ================== CRUD BÁSICO ==================

  getAll(): Observable<TipoVehiculo[]> {
    return this.http.get<TipoVehiculo[]>(this.apiUrl);
  }

  getById(idTipoVehiculo: number): Observable<TipoVehiculo> {
    return this.http.get<TipoVehiculo>(`${this.apiUrl}/${idTipoVehiculo}`);
  }

  create(payload: TipoVehiculoCreatePayload): Observable<TipoVehiculo> {
    // El backend ignora/elimina el id y lo genera automáticamente
    return this.http.post<TipoVehiculo>(this.apiUrl, payload);
  }

  update(idTipoVehiculo: number, payload: TipoVehiculoCreatePayload): Observable<TipoVehiculo> {
    return this.http.put<TipoVehiculo>(`${this.apiUrl}/${idTipoVehiculo}`, payload);
  }

  delete(idTipoVehiculo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idTipoVehiculo}`);
  }

  // ============ CONSULTAS SIMPLES / INTERMEDIAS ============

  /**
   * GET /api/tipos-vehiculo/por-nombre?tipo=Sedán
   */
  buscarPorTipoExacto(tipo: string): Observable<TipoVehiculo> {
    const params = new HttpParams().set('tipo', tipo);
    return this.http.get<TipoVehiculo>(`${this.apiUrl}/por-nombre`, { params });
  }

  /**
   * GET /api/tipos-vehiculo/buscar?texto=camion
   */
  buscarPorTipoConteniendo(texto: string): Observable<TipoVehiculo[]> {
    const params = new HttpParams().set('texto', texto);
    return this.http.get<TipoVehiculo[]>(`${this.apiUrl}/buscar`, { params });
  }

  /**
   * GET /api/tipos-vehiculo/creados?inicio=2025-01-01T00:00:00&fin=2025-12-31T23:59:59
   * Debes pasar las fechas ya en formato ISO-8601 (yyyy-MM-ddTHH:mm:ss).
   */
  buscarPorRangoFechasCreacion(inicio: string, fin: string): Observable<TipoVehiculo[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<TipoVehiculo[]>(`${this.apiUrl}/creados`, { params });
  }

  /**
   * GET /api/tipos-vehiculo/ordenados
   */
  listarOrdenadosPorNombre(): Observable<TipoVehiculo[]> {
    return this.http.get<TipoVehiculo[]>(`${this.apiUrl}/ordenados`);
  }

  // ============ CONSULTAS COMPLEJAS / ESTADÍSTICAS ============

  /**
   * GET /api/tipos-vehiculo/estadisticas/por-tipo
   * Devuelve una lista de:
   * { idTipoVehiculo, nombreTipo, cantidadVehiculos }
   */
  contarVehiculosPorTipo(): Observable<TipoVehiculoEstadistica[]> {
    return this.http.get<TipoVehiculoEstadistica[]>(
      `${this.apiUrl}/estadisticas/por-tipo`
    );
  }

  /**
   * GET /api/tipos-vehiculo/sin-vehiculos
   */
  buscarTiposSinVehiculos(): Observable<TipoVehiculo[]> {
    return this.http.get<TipoVehiculo[]>(`${this.apiUrl}/sin-vehiculos`);
  }

  /**
   * GET /api/tipos-vehiculo/estadisticas/por-tipo-rango-anio?inicio=2010&fin=2024
   */
  contarVehiculosPorTipoEnRangoAnio(
    anioInicio: number,
    anioFin: number
  ): Observable<TipoVehiculoEstadistica[]> {
    const params = new HttpParams()
      .set('inicio', anioInicio.toString())
      .set('fin', anioFin.toString());

    return this.http.get<TipoVehiculoEstadistica[]>(
      `${this.apiUrl}/estadisticas/por-tipo-rango-anio`,
      { params }
    );
  }
}
