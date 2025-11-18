// src/app/services/cliente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Cliente,
  ClienteCreatePayload,
  // ClienteVehiculosResumen,
  // ClienteFacturacionResumen
} from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly apiUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) {}

  // ====================== CRUD BÁSICO ======================

  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getById(idCliente: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${idCliente}`);
  }

  create(payload: ClienteCreatePayload): Observable<Cliente> {
    // El backend espera un Cliente completo con idCliente informado
    return this.http.post<Cliente>(this.apiUrl, payload);
  }

  update(idCliente: string, payload: ClienteCreatePayload): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${idCliente}`, payload);
  }

  delete(idCliente: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idCliente}`);
  }

  // ====================== CONSULTAS / FILTROS ======================

  /**
   * GET /api/clientes/correo?correo=...
   */
  getByCorreo(correo: string): Observable<Cliente> {
    const params = new HttpParams().set('correo', correo);
    return this.http.get<Cliente>(`${this.apiUrl}/correo`, { params });
  }

  /**
   * GET /api/clientes/buscar-nombre?texto=...
   */
  buscarPorNombre(texto: string): Observable<Cliente[]> {
    const params = new HttpParams().set('texto', texto);
    return this.http.get<Cliente[]>(`${this.apiUrl}/buscar-nombre`, { params });
  }

  /**
   * GET /api/clientes/buscar-telefono?prefijo=...
   */
  buscarPorTelefonoPrefijo(prefijo: string): Observable<Cliente[]> {
    const params = new HttpParams().set('prefijo', prefijo);
    return this.http.get<Cliente[]>(`${this.apiUrl}/buscar-telefono`, { params });
  }

  /**
   * GET /api/clientes/creados?inicio=yyyy-MM-ddTHH:mm:ss&fin=yyyy-MM-ddTHH:mm:ss
   *
   * Puedes pasar las fechas ya formateadas desde el componente.
   */
  buscarPorRangoFechasCreacion(inicio: string, fin: string): Observable<Cliente[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<Cliente[]>(`${this.apiUrl}/creados`, { params });
  }

  // ====================== REPORTES / AGREGADOS ======================

  /**
   * GET /api/clientes/vehiculos
   * Backend devuelve List<Object[]> → JSON como array de arrays:
   * [
   *   ["123", "Juan Pérez", 3],
   *   ["456", "María López", 1],
   *   ...
   * ]
   *
   * Lo más honesto es tiparlo como any[] aquí y mapearlo en el componente
   * a ClienteVehiculosResumen si quieres tipado fuerte.
   */
  contarVehiculosPorCliente(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vehiculos`);
    // Variante tipada (si haces el mapeo manual):
    // return this.http.get<any[]>(`${this.apiUrl}/vehiculos`).pipe(
    //   map(filas => filas.map(f => ({
    //     idCliente: f[0],
    //     nombreCliente: f[1],
    //     cantidadVehiculos: f[2]
    //   }) as ClienteVehiculosResumen))
    // );
  }

  /**
   * GET /api/clientes/sin-vehiculos
   */
  listarClientesSinVehiculos(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/sin-vehiculos`);
  }

  /**
   * GET /api/clientes/resumen-facturacion?inicio=yyyy-MM-dd&fin=yyyy-MM-dd
   *
   * Igual que el anterior, el backend devuelve List<Object[]> → array de arrays:
   * [idCliente, nombreCliente, totalFacturado, manoObraTotal, repuestosTotal, impuestoTotal]
   */
  obtenerResumenFacturacion(
    inicio: string,
    fin: string
  ): Observable<any[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<any[]>(`${this.apiUrl}/resumen-facturacion`, { params });

    // Variante tipada si mapeas al modelo:
    // return this.http.get<any[]>(`${this.apiUrl}/resumen-facturacion`, { params }).pipe(
    //   map(filas => filas.map(f => ({
    //     idCliente: f[0],
    //     nombreCliente: f[1],
    //     totalFacturado: f[2],
    //     manoObraTotal: f[3],
    //     repuestosTotal: f[4],
    //     impuestoTotal: f[5]
    //   }) as ClienteFacturacionResumen))
    // );
  }
}
