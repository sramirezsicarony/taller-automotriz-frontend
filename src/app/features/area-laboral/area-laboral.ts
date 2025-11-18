import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  AreaLaboral as AreaLaboralModel,
  AreaLaboralCreatePayload,
} from '../../models/area-laboral';
import { AreaLaboralService } from '../../services/area-laboral';

@Component({
  selector: 'app-area-laboral',
  templateUrl: './area-laboral.html',
  styleUrls: ['./area-laboral.scss'],
  standalone : false
})
export class AreaLaboral implements OnInit {
  areasLaborales: AreaLaboralModel[] = [];
  areaLaboralForm!: FormGroup;

  isEditing = false;
  editingId: number | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private areaLaboralService: AreaLaboralService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadAreasLaborales();
  }

  private initForm(): void {
    this.areaLaboralForm = this.fb.group({
      area: ['', [Validators.required]],
    });
  }

  private loadAreasLaborales(): void {
    this.isLoading = true;
    this.areaLaboralService.getAll().subscribe({
      next: (data) => {
        this.areasLaborales = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar áreas laborales', err);
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.areaLaboralForm.invalid) {
      this.areaLaboralForm.markAllAsTouched();
      return;
    }

    const payload: AreaLaboralCreatePayload = {
      area: this.areaLaboralForm.value.area,
    };

    if (this.isEditing && this.editingId !== null) {
      this.updateAreaLaboral(this.editingId, payload);
    } else {
      this.createAreaLaboral(payload);
    }
  }

  private createAreaLaboral(payload: AreaLaboralCreatePayload): void {
    this.areaLaboralService.create(payload).subscribe({
      next: (created) => {
        this.areasLaborales.push(created);
        this.resetForm();
      },
      error: (err) => {
        console.error('Error al crear área laboral', err);
      },
    });
  }

  private updateAreaLaboral(id: number, payload: AreaLaboralCreatePayload): void {
    this.areaLaboralService.update(id, payload).subscribe({
      next: (updated) => {
        const index = this.areasLaborales.findIndex(a => a.idAreaLaboral === id);
        if (index !== -1) {
          this.areasLaborales[index] = updated;
        }
        this.cancelEdit();
      },
      error: (err) => {
        console.error('Error al actualizar área laboral', err);
      },
    });
  }

  onEdit(area: AreaLaboralModel): void {
    this.isEditing = true;
    this.editingId = area.idAreaLaboral;

    this.areaLaboralForm.patchValue({
      area: area.area,
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingId = null;
    this.resetForm();
  }

  private resetForm(): void {
    this.areaLaboralForm.reset();
    this.areaLaboralForm.markAsPristine();
    this.areaLaboralForm.markAsUntouched();
  }

  onDelete(area: AreaLaboralModel): void {
    const confirmado = confirm(
      `¿Seguro que desea eliminar el área laboral "${area.area}"?`
    );
    if (!confirmado) return;

    this.areaLaboralService.delete(area.idAreaLaboral).subscribe({
      next: () => {
        this.areasLaborales = this.areasLaborales.filter(
          (a) => a.idAreaLaboral !== area.idAreaLaboral
        );
      },
      error: (err) => {
        console.error('Error al eliminar área laboral', err);
      },
    });
  }

  private ctrlTouched(c: any): boolean { return !!c && !!c['touched']; }
  private ctrlDirty(c: any): boolean   { return !!c && !!c['dirty']; }

  hasError(controlName: string, error: string): boolean {
    const control = this.areaLaboralForm.get(controlName);
    return !!control && this.ctrlTouched(control) && control.hasError(error);
  }
}
