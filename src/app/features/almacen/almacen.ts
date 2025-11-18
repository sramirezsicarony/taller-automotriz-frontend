import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import {
  Almacen as AlmacenModel,
  AlmacenCreatePayload,
} from '../../../app/models/almacen';
import { AlmacenService } from '../../services/almacen';

@Component({
  selector: 'app-almacen',
  standalone: false,
  templateUrl: './almacen.html',
  styleUrls:  ['./almacen.scss'],
})

export class Almacen implements OnInit {
  almacenes: AlmacenModel[] = [];
  almacenForm!: FormGroup;

  isEditing = false;
  editingId: number | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private almacenService: AlmacenService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadAlmacenes();
  }

  private initForm(): void {
    this.almacenForm = this.fb.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
    });
  }

  private loadAlmacenes(): void {
    this.isLoading = true;
    this.almacenService.getAll().subscribe({
      next: (data) => {
        this.almacenes = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar almacenes', err);
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.almacenForm.invalid) {
      this.almacenForm.markAllAsTouched();
      return;
    }

    const payload: AlmacenCreatePayload = {
      nombre: this.almacenForm.value.nombre,
      direccion: this.almacenForm.value.direccion,
    };

    if (this.isEditing && this.editingId !== null) {
      this.updateAlmacen(this.editingId, payload);
    } else {
      this.createAlmacen(payload);
    }
  }

  private createAlmacen(payload: AlmacenCreatePayload): void {
    this.almacenService.create(payload).subscribe({
      next: (created) => {
        this.almacenes.push(created);
        this.almacenForm.reset();
        this.almacenForm.markAsPristine();
        this.almacenForm.markAsUntouched();
      },
      error: (err) => {
        console.error('Error al crear almacén', err);
      },
    });
  }

  private updateAlmacen(id: number, payload: AlmacenCreatePayload): void {
    this.almacenService.update(id, payload).subscribe({
      next: (updated) => {
        const index = this.almacenes.findIndex(a => a.idAlmacen === id);
        if (index !== -1) {
          this.almacenes[index] = updated;
        }
        this.cancelEdit();
      },
      error: (err) => {
        console.error('Error al actualizar almacén', err);
      },
    });
  }

  onEdit(almacen: AlmacenModel): void {
    this.isEditing = true;
    this.editingId = almacen.idAlmacen;

    this.almacenForm.patchValue({
      nombre: almacen.nombre,
      direccion: almacen.direccion,
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingId = null;
    this.almacenForm.reset();
    this.almacenForm.markAsPristine();
    this.almacenForm.markAsUntouched();
  }

  onDelete(almacen: AlmacenModel): void {
    const confirmado = confirm(
      `¿Seguro que desea eliminar el almacén "${almacen.nombre}"?`
    );
    if (!confirmado) return;

    this.almacenService.delete(almacen.idAlmacen).subscribe({
      next: () => {
        this.almacenes = this.almacenes.filter(
          (a) => a.idAlmacen !== almacen.idAlmacen
        );
      },
      error: (err) => {
        console.error('Error al eliminar almacén', err);
      },
    });
  }
  private ctrlTouched(c: any): boolean { return !!c && !!c['touched']; }
  private ctrlDirty(c: any): boolean   { return !!c && !!c['dirty']; }
  // helpers para template
  hasError(controlName: string, error: string): boolean {
    const control = this.almacenForm.get(controlName);
    return !!control && this.ctrlTouched(control) && control.hasError(error);
  }


}
