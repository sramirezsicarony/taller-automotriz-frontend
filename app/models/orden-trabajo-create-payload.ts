export interface OrdenTrabajoCreatePayload {
  idVehiculo: string;           // placa
  diagnosticoInicial: string;
  fechaIngreso: string;         // 'YYYY-MM-DD'
  idEstadoOrden?: number;       // opcional al crear
  fechaSalida?: string;
}

