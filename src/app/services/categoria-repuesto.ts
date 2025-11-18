// src/app/services/categoria-repuesto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  CategoriaRepuesto,
  CategoriaRepuestoCreatePayload,
  CategoriaRepuestoConteoDTO,
  CategoriaRepuestoInventarioDTO,
} from '../models/categoria-repuesto';

@Injectable({
  providedIn: 'root',
})
export class CategoriaRepuestoService {
  private readonly apiUrl = 'http://localhost:8080/api/categorias-repuesto';

  constructor(private http: HttpClient) {}

  // ================== CRUD BÁSICO ==================

  /**
   * GET /api/categorias-repuesto
   */
  getAll(): Observable<CategoriaRepuesto[]> {
    return this.http.get<CategoriaRepuesto[]>(this.apiUrl);
  }

  /**
   * GET /api/categorias-repuesto/{id}
   */
  getById(idCategoria: number): Observable<CategoriaRepuesto> {
    return this.http.get<CategoriaRepuesto>(`${this.apiUrl}/${idCategoria}`);
  }

  /**
   * POST /api/categorias-repuesto
   *
   * Backend genera el id. Solo necesita: { categoria }
   */
  create(
    payload: CategoriaRepuestoCreatePayload
  ): Observable<CategoriaRepuesto> {
    // El controller ya hace setIdCategoria(null), así que aquí solo mandamos la categoría
    const body = {
      categoria: payload.categoria,
    };

    return this.http.post<CategoriaRepuesto>(this.apiUrl, body);
  }

  /**
   * PUT /api/categorias-repuesto/{id}
   *
   * Solo se actualiza el nombre de la categoría.
   */
  update(
    idCategoria: number,
    payload: CategoriaRepuestoCreatePayload
  ): Observable<CategoriaRepuesto> {
    const body = {
      categoria: payload.categoria,
    };

    return this.http.put<CategoriaRepuesto>(
      `${this.apiUrl}/${idCategoria}`,
      body
    );
  }

  /**
   * DELETE /api/categorias-repuesto/{id}
   */
  delete(idCategoria: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idCategoria}`);
  }

  // ================== CONSULTAS SIMPLES / INTERMEDIAS ==================

  /**
   * GET /api/categorias-repuesto/por-nombre?nombre=Filtros
   */
  obtenerPorNombre(nombreCategoria: string): Observable<CategoriaRepuesto> {
    const params = new HttpParams().set('nombre', nombreCategoria);
    return this.http.get<CategoriaRepuesto>(
      `${this.apiUrl}/por-nombre`,
      { params }
    );
  }

  /**
   * GET /api/categorias-repuesto/buscar?texto=filt
   */
  buscarPorNombreConteniendo(texto: string): Observable<CategoriaRepuesto[]> {
    const params = new HttpParams().set('texto', texto);
    return this.http.get<CategoriaRepuesto[]>(
      `${this.apiUrl}/buscar`,
      { params }
    );
  }

  /**
   * GET /api/categorias-repuesto/creadas?inicio=2025-01-01T00:00:00&fin=2025-12-31T23:59:59
   *
   * inicio / fin en formato ISO: 'YYYY-MM-DDTHH:mm:ss'
   */
  buscarPorRangoFechasCreacion(
    inicio: string,
    fin: string
  ): Observable<CategoriaRepuesto[]> {
    const params = new HttpParams().set('inicio', inicio).set('fin', fin);

    return this.http.get<CategoriaRepuesto[]>(
      `${this.apiUrl}/creadas`,
      { params }
    );
  }

  /**
   * GET /api/categorias-repuesto/ordenadas
   */
  listarOrdenadasPorNombre(): Observable<CategoriaRepuesto[]> {
    return this.http.get<CategoriaRepuesto[]>(
      `${this.apiUrl}/ordenadas`
    );
  }

  // ================== ESTADÍSTICAS / REPORTES ==================

  /**
   * GET /api/categorias-repuesto/estadisticas/repuestos-por-categoria
   * DTO: { idCategoria, nombreCategoria, cantidadRepuestos }
   */
  contarRepuestosPorCategoria(): Observable<CategoriaRepuestoConteoDTO[]> {
    return this.http.get<CategoriaRepuestoConteoDTO[]>(
      `${this.apiUrl}/estadisticas/repuestos-por-categoria`
    );
  }

  /**
   * GET /api/categorias-repuesto/sin-repuestos
   */
  listarCategoriasSinRepuestos(): Observable<CategoriaRepuesto[]> {
    return this.http.get<CategoriaRepuesto[]>(
      `${this.apiUrl}/sin-repuestos`
    );
  }

  /**
   * GET /api/categorias-repuesto/estadisticas/stock-valor-por-categoria
   * DTO: { idCategoria, nombreCategoria, stockTotal, valorTotal }
   */
  obtenerStockYValorTotalPorCategoriaEnBodega():
    Observable<CategoriaRepuestoInventarioDTO[]> {
    return this.http.get<CategoriaRepuestoInventarioDTO[]>(
      `${this.apiUrl}/estadisticas/stock-valor-por-categoria`
    );
  }
}
