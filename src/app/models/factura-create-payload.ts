export interface FacturaCreatePayload {
  idOrdenTrabajo: number;
  idEstadoFactura: number;
  idCliente: string;
  fechaCreacion: string;           // 'YYYY-MM-DD'
  subTotalManoDeObra: number;
  subTotalRepuestos: number;
  impuesto: number;
  total: number;
}
