// src/app/models/factura.model.ts
import { Auditable } from './base';
import { OrdenTrabajo } from './orden-trabajo';
import { Cliente } from './cliente';
import { EstadoFactura } from './estado-factura';

export interface Factura extends Auditable {
  idFactura: number;
  ordenTrabajo: OrdenTrabajo;
  estadoFactura: EstadoFactura;
  cliente: Cliente;
  fechaCreacion: string;            // LocalDate → string 'YYYY-MM-DD'
  subTotalManoDeObra: number;
  subTotalRepuestos: number;
  impuesto: number;
  total: number;
}

// Payload usado en formularios (ids planos)
export interface FacturaCreatePayload {
  idOrdenTrabajo: number;
  idEstadoFactura: number;
  idCliente: string;
  fechaCreacion: string;            // 'YYYY-MM-DD'
  subTotalManoDeObra: number;
  subTotalRepuestos: number;
  impuesto: number;
  total: number;
}

// Para actualizar: mismos campos que para crear
export interface FacturaUpdatePayload extends FacturaCreatePayload {}

// ========== DTOs de reportes / agregados ==========

// /api/facturas/resumen-cliente
// [idCliente, nombreCliente, totalFacturado, manoObraTotal, repuestosTotal, impuestoTotal, cantidadFacturas]
export interface FacturaResumenClienteReporte {
  idCliente: string;
  nombreCliente: string;
  totalFacturado: number;
  manoObraTotal: number;
  repuestosTotal: number;
  impuestoTotal: number;
  cantidadFacturas: number;
}

// /api/facturas/total-por-estado
// [idEstadoFactura, nombreEstado, totalFacturado, cantidadFacturas]
export interface FacturaTotalPorEstadoReporte {
  idEstadoFactura: number;
  nombreEstado: string;
  totalFacturado: number;
  cantidadFacturas: number;
}

// /api/facturas/facturacion-mensual
// [anio, mes, totalFacturado, manoObraTotal, repuestosTotal, impuestoTotal, cantidadFacturas]
export interface FacturacionMensualReporte {
  anio: number;
  mes: number;
  totalFacturado: number;
  manoObraTotal: number;
  repuestosTotal: number;
  impuestoTotal: number;
  cantidadFacturas: number;
}
