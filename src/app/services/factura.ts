// src/app/services/factura.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Factura,
  FacturaCreatePayload,
  FacturaUpdatePayload,
  FacturaResumenClienteReporte,
  FacturaTotalPorEstadoReporte,
  FacturacionMensualReporte,
} from '../models/factura';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  private readonly apiUrl = 'http://localhost:8080/api/facturas';

  constructor(private http: HttpClient) {}

  // ====================== CRUD BÁSICO ======================

  /**
   * GET /api/facturas
   */
  getAll(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.apiUrl);
  }

  /**
   * GET /api/facturas/{idFactura}
   */
  getById(idFactura: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.apiUrl}/${idFactura}`);
  }

  /**
   * POST /api/facturas
   *
   * El backend espera:
   * {
   *   "ordenTrabajo": { "idOrdenTrabajo": 1 },
   *   "estadoFactura": { "idEstadoFactura": 1 },
   *   "cliente": { "idCliente": "123" },
   *   "fechaCreacion": "2025-11-18",
   *   "subTotalManoDeObra": 100000,
   *   "subTotalRepuestos": 200000,
   *   "impuesto": 57000,
   *   "total": 357000
   * }
   */
  create(payload: FacturaCreatePayload): Observable<Factura> {
    const body = {
      ordenTrabajo: { idOrdenTrabajo: payload.idOrdenTrabajo },
      estadoFactura: { idEstadoFactura: payload.idEstadoFactura },
      cliente: { idCliente: payload.idCliente },
      fechaCreacion: payload.fechaCreacion,
      subTotalManoDeObra: payload.subTotalManoDeObra,
      subTotalRepuestos: payload.subTotalRepuestos,
      impuesto: payload.impuesto,
      total: payload.total,
    };

    return this.http.post<Factura>(this.apiUrl, body);
  }

  /**
   * PUT /api/facturas/{idFactura}
   */
  update(idFactura: number, payload: FacturaUpdatePayload): Observable<Factura> {
    const body = {
      ordenTrabajo: { idOrdenTrabajo: payload.idOrdenTrabajo },
      estadoFactura: { idEstadoFactura: payload.idEstadoFactura },
      cliente: { idCliente: payload.idCliente },
      fechaCreacion: payload.fechaCreacion,
      subTotalManoDeObra: payload.subTotalManoDeObra,
      subTotalRepuestos: payload.subTotalRepuestos,
      impuesto: payload.impuesto,
      total: payload.total,
    };

    return this.http.put<Factura>(`${this.apiUrl}/${idFactura}`, body);
  }

  /**
   * DELETE /api/facturas/{idFactura}
   */
  delete(idFactura: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idFactura}`);
  }

  // ====================== CONSULTAS / FILTROS ======================

  /**
   * GET /api/facturas/cliente/{idCliente}
   */
  listarPorIdCliente(idCliente: string): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.apiUrl}/cliente/${idCliente}`);
  }

  /**
   * GET /api/facturas/estado/{idEstadoFactura}
   */
  listarPorIdEstadoFactura(idEstadoFactura: number): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.apiUrl}/estado/${idEstadoFactura}`);
  }

  /**
   * GET /api/facturas/fecha?inicio=YYYY-MM-DD&fin=YYYY-MM-DD
   */
  buscarPorFechaCreacionEntre(inicio: string, fin: string): Observable<Factura[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<Factura[]>(`${this.apiUrl}/fecha`, { params });
  }

  /**
   * GET /api/facturas/total?rangoMin=...&rangoMax=...
   */
  buscarPorTotalEntre(totalMin: number, totalMax: number): Observable<Factura[]> {
    const params = new HttpParams()
      .set('rangoMin', totalMin)
      .set('rangoMax', totalMax);

    return this.http.get<Factura[]>(`${this.apiUrl}/total`, { params });
  }

  // ====================== REPORTES / AGREGADOS ======================

  /**
   * GET /api/facturas/resumen-cliente?inicio=YYYY-MM-DD&fin=YYYY-MM-DD
   */
  obtenerResumenFacturacionPorClienteEnRangoFechas(
    inicio: string,
    fin: string
  ): Observable<FacturaResumenClienteReporte[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<FacturaResumenClienteReporte[]>(
      `${this.apiUrl}/resumen-cliente`,
      { params }
    );
  }

  /**
   * GET /api/facturas/total-por-estado?inicio=YYYY-MM-DD&fin=YYYY-MM-DD
   */
  obtenerTotalFacturadoPorEstadoEnRangoFechas(
    inicio: string,
    fin: string
  ): Observable<FacturaTotalPorEstadoReporte[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<FacturaTotalPorEstadoReporte[]>(
      `${this.apiUrl}/total-por-estado`,
      { params }
    );
  }

  /**
   * GET /api/facturas/facturacion-mensual?inicio=YYYY-MM-DD&fin=YYYY-MM-DD
   */
  obtenerFacturacionMensualEnRangoFechas(
    inicio: string,
    fin: string
  ): Observable<FacturacionMensualReporte[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<FacturacionMensualReporte[]>(
      `${this.apiUrl}/facturacion-mensual`,
      { params }
    );
  }
}
