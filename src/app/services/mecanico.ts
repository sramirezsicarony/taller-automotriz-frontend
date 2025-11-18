// src/app/services/mecanico.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Mecanico,
  MecanicoCreatePayload,
  // HorasCostoMecanicoResumen,
  // HorasPorMecanicoAreaResumen
} from '../models/mecanico';

@Injectable({
  providedIn: 'root'
})
export class MecanicoService {

  private readonly apiUrl = 'http://localhost:8080/api/mecanicos';

  constructor(private http: HttpClient) {}

  // ====================== CRUD BÁSICO ======================

  getAll(): Observable<Mecanico[]> {
    return this.http.get<Mecanico[]>(this.apiUrl);
  }

  getById(idMecanico: string): Observable<Mecanico> {
    return this.http.get<Mecanico>(`${this.apiUrl}/${idMecanico}`);
  }

  create(payload: MecanicoCreatePayload): Observable<Mecanico> {
    // idMecanico debe venir informado (no es autogenerado)
    return this.http.post<Mecanico>(this.apiUrl, payload);
  }

  update(idMecanico: string, payload: MecanicoCreatePayload): Observable<Mecanico> {
    return this.http.put<Mecanico>(`${this.apiUrl}/${idMecanico}`, payload);
  }

  delete(idMecanico: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idMecanico}`);
  }

  // ====================== CONSULTAS / FILTROS ======================

  /**
   * GET /api/mecanicos/especialidad/{idEspecialidad}
   */
  listarPorIdEspecialidad(idEspecialidad: number): Observable<Mecanico[]> {
    return this.http.get<Mecanico[]>(`${this.apiUrl}/especialidad/${idEspecialidad}`);
  }

  /**
   * GET /api/mecanicos/experiencia?min=3
   */
  buscarPorExperienciaMayorIgual(minExperiencia: number): Observable<Mecanico[]> {
    const params = new HttpParams().set('min', minExperiencia.toString());
    return this.http.get<Mecanico[]>(`${this.apiUrl}/experiencia`, { params });
  }

  /**
   * GET /api/mecanicos/costo-hora?rangoMin=20000&rangoMax=50000
   *
   * costoMin / costoMax se envían como query param numérico (se serializa a string).
   */
  buscarPorRangoCostoHora(costoMin: number, costoMax: number): Observable<Mecanico[]> {
    const params = new HttpParams()
      .set('rangoMin', costoMin.toString())
      .set('rangoMax', costoMax.toString());

    return this.http.get<Mecanico[]>(`${this.apiUrl}/costo-hora`, { params });
  }

  /**
   * GET /api/mecanicos/creados?inicio=yyyy-MM-ddTHH:mm:ss&fin=yyyy-MM-ddTHH:mm:ss
   *
   * Ejemplo: "2025-01-01T00:00:00"
   */
  buscarPorRangoFechasCreacion(inicio: string, fin: string): Observable<Mecanico[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<Mecanico[]>(`${this.apiUrl}/creados`, { params });
  }

  // ====================== REPORTES / RENDIMIENTO ======================

  /**
   * GET /api/mecanicos/horas-costo?rangoInicio=...&rangoFin=...
   *
   * Backend devuelve List<Object[]> → JSON como:
   * [
   *   ["123", 5, 40.5, 120000.0],
   *   ...
   * ]
   */
  obtenerHorasYCostoTotalPorMecanicoEnRangoFechas(
    rangoInicio: string,
    rangoFin: string
  ): Observable<any[]> {
    const params = new HttpParams()
      .set('rangoInicio', rangoInicio)
      .set('rangoFin', rangoFin);

    return this.http.get<any[]>(`${this.apiUrl}/horas-costo`, { params });

    // Variante tipada:
    /*
    return this.http.get<any[]>(`${this.apiUrl}/horas-costo`, { params }).pipe(
      map(filas => filas.map(f => ({
        idMecanico: f[0],
        experiencia: f[1],
        horasTotales: f[2],
        costoTotal: f[3],
      }) as HorasCostoMecanicoResumen))
    );
    */
  }

  /**
   * GET /api/mecanicos/sin-ordenes
   */
  listarMecanicosSinOrdenes(): Observable<Mecanico[]> {
    return this.http.get<Mecanico[]>(`${this.apiUrl}/sin-ordenes`);
  }

  /**
   * GET /api/mecanicos/horas-por-area?rangoInicio=...&rangoFin=...
   *
   * Backend devuelve List<Object[]> → JSON como:
   * [
   *   ["123", 1, "Motor", 30.0],
   *   ...
   * ]
   */
  obtenerHorasPorMecanicoYAreaEnRangoFechas(
    rangoInicio: string,
    rangoFin: string
  ): Observable<any[]> {
    const params = new HttpParams()
      .set('rangoInicio', rangoInicio)
      .set('rangoFin', rangoFin);

    return this.http.get<any[]>(`${this.apiUrl}/horas-por-area`, { params });

    // Variante tipada:
    /*
    return this.http.get<any[]>(`${this.apiUrl}/horas-por-area`, { params }).pipe(
      map(filas => filas.map(f => ({
        idMecanico: f[0],
        idAreaLaboral: f[1],
        nombreArea: f[2],
        horasTotales: f[3],
      }) as HorasPorMecanicoAreaResumen))
    );
    */
  }
}
