export interface VehiculoCreatePayload {
  idVehiculo: string;
  marca: string;
  modelo: string;
  anio: number;
  tipoVehiculo: { idTipoVehiculo: number };
  cliente: { idCliente: string };
}
