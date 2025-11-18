// src/app/services/vehiculo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Vehiculo,
  VehiculoCreatePayload,
  // VehiculoOrdenesResumen,
  // VehiculoFacturacionResumen
} from '../models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private readonly apiUrl = 'http://localhost:8080/api/vehiculos';

  constructor(private http: HttpClient) {}

  // ====================== CRUD BÁSICO ======================

  getAll(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.apiUrl);
  }

  getById(idVehiculo: string): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`${this.apiUrl}/${idVehiculo}`);
  }

  create(payload: VehiculoCreatePayload): Observable<Vehiculo> {
    // El backend espera un Vehiculo con:
    // - idVehiculo (placa)
    // - marca, modelo, anio
    // - tipoVehiculo: { idTipoVehiculo }
    // - cliente: { idCliente }
    return this.http.post<Vehiculo>(this.apiUrl, payload);
  }

  update(idVehiculo: string, payload: VehiculoCreatePayload): Observable<Vehiculo> {
    return this.http.put<Vehiculo>(`${this.apiUrl}/${idVehiculo}`, payload);
  }

  delete(idVehiculo: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idVehiculo}`);
  }

  // ====================== CONSULTAS / FILTROS ======================

  /**
   * GET /api/vehiculos/cliente/{idCliente}
   */
  listarPorIdCliente(idCliente: string): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.apiUrl}/cliente/${idCliente}`);
  }

  /**
   * GET /api/vehiculos/buscar-marca?marca=toyota
   */
  buscarPorMarca(marca: string): Observable<Vehiculo[]> {
    const params = new HttpParams().set('marca', marca);
    return this.http.get<Vehiculo[]>(`${this.apiUrl}/buscar-marca`, { params });
  }

  /**
   * GET /api/vehiculos/buscar-modelo?modelo=corolla
   */
  buscarPorModelo(modelo: string): Observable<Vehiculo[]> {
    const params = new HttpParams().set('modelo', modelo);
    return this.http.get<Vehiculo[]>(`${this.apiUrl}/buscar-modelo`, { params });
  }

  /**
   * GET /api/vehiculos/anio?rangoInicio=2015&rangoFin=2020
   */
  buscarPorRangoAnio(anioInicio: number, anioFin: number): Observable<Vehiculo[]> {
    const params = new HttpParams()
      .set('rangoInicio', anioInicio.toString())
      .set('rangoFin', anioFin.toString());

    return this.http.get<Vehiculo[]>(`${this.apiUrl}/anio`, { params });
  }

  // ====================== REPORTES / AGREGADOS ======================

  /**
   * GET /api/vehiculos/ordenes
   * Backend devuelve List<Object[]> → JSON como array de arrays:
   * [
   *   ["ABC123", "Toyota", "Corolla", 2018, 5],
   *   ["DEF456", "Mazda", "3", 2020, 2],
   *   ...
   * ]
   */
  contarOrdenesPorVehiculo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ordenes`);

    // Si quieres mapear a VehiculoOrdenesResumen:
    /*
    return this.http.get<any[]>(`${this.apiUrl}/ordenes`).pipe(
      map(filas => filas.map(f => ({
        idVehiculo: f[0],
        marca: f[1],
        modelo: f[2],
        anio: f[3],
        cantidadOrdenes: f[4],
      }) as VehiculoOrdenesResumen))
    );
    */
  }

  /**
   * GET /api/vehiculos/sin-ordenes
   */
  listarVehiculosSinOrdenes(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.apiUrl}/sin-ordenes`);
  }

  /**
   * GET /api/vehiculos/facturacion?inicio=yyyy-MM-dd&fin=yyyy-MM-dd
   *
   * Backend devuelve List<Object[]> → array de arrays:
   * [idVehiculo, marca, modelo, anio, totalFacturado, cantidadFacturas]
   */
  obtenerTotalFacturadoPorVehiculoEnRangoFechas(
    inicio: string,
    fin: string
  ): Observable<any[]> {
    const params = new HttpParams()
      .set('inicio', inicio)
      .set('fin', fin);

    return this.http.get<any[]>(`${this.apiUrl}/facturacion`, { params });

    // Variante tipada:
    /*
    return this.http.get<any[]>(`${this.apiUrl}/facturacion`, { params }).pipe(
      map(filas => filas.map(f => ({
        idVehiculo: f[0],
        marca: f[1],
        modelo: f[2],
        anio: f[3],
        totalFacturado: f[4],
        cantidadFacturas: f[5],
      }) as VehiculoFacturacionResumen))
    );
    */
  }
}
