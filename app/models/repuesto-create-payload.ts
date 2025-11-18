export interface RepuestoCreatePayload {
  nombre: string;
  descripcion?: string;
  categoriaRepuesto: { idCategoria: number };
}
