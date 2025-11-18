import { Auditable } from './base';

export interface CategoriaRepuesto extends Auditable {
  idCategoria: number;
  categoria: string;
}
