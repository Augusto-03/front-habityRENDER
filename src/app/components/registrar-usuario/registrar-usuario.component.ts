import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { RegistroUsuario } from '../../models/registro-usuario/registro-usuario.component';

@Component({
  selector: 'app-registrar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterModule
  ],
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent {
  formulario: FormGroup;

  reglas = {
    longitud: false,
    mayuscula: false,
    minuscula: false,
    numero: false,
    especial: false
  };

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private snack: MatSnackBar
  ) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      edad: [null, [Validators.required, Validators.min(0)]],
      peso: [null, [Validators.required, Validators.min(0)]],
      altura: [null, [Validators.required, Validators.min(0)]]
    });
  }

  verificarPassword() {
    const valor = this.formulario.get('password')?.value || '';

    this.reglas.longitud = valor.length >= 10;
    this.reglas.mayuscula = /[A-Z]/.test(valor);
    this.reglas.minuscula = /[a-z]/.test(valor);
    this.reglas.numero = /[0-9]/.test(valor);
    this.reglas.especial = /[!@#$%^&*(),.?":{}|<>]/.test(valor);
  }

  registrar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const datos = this.formulario.value as RegistroUsuario;

    this.usuarioService.registrar(datos).subscribe({
      next: () => {
        this.snack.open('Usuario registrado exitosamente', 'Cerrar', { duration: 3000 });
        this.formulario.reset();
      },
      error: () => {
        this.snack.open('Error al registrar usuario', 'Cerrar', { duration: 3000 });
      }
    });
  }
}





