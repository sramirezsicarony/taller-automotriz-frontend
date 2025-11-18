import { Auditable } from './base';

import { CategoriaRepuesto } from './categoria-repuesto';

export interface Repuesto extends Auditable {
  idRepuesto: number;
  nombre: string;
  descripcion?: string;
  categoriaRepuesto: CategoriaRepuesto; // FK a categorias_repuesto
}

export interface RepuestoCreatePayload {
  nombre: string;
  descripcion?: string;
  categoriaRepuesto: { idCategoria: number };
}
