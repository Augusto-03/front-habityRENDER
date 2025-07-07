import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { TipoHabitoService } from '../../services/registrar-tipo.service';

@Component({
  standalone: true,
  selector: 'app-registrar-tipo',
  templateUrl: './registrar-tipo.component.html',
  styleUrls: ['./registrar-tipo.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class RegistrarTipoComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tipoHabitoService: TipoHabitoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  guardar() {
    if (this.form.valid) {
      const tipo = {
        nombre: this.form.value.nombre as string
      };

      this.tipoHabitoService.crearTipoHabito(tipo).subscribe(() => {
        this.router.navigate(['/registrar-habito']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/registrar-habito']);
  }
}


