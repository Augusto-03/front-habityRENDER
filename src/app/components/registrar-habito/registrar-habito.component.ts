import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-registrar-habito',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterModule,
    MatSelectModule
  ],
  templateUrl: './registrar-habito.component.html',
  styleUrls: ['./registrar-habito.component.css']
})
export class RegistrarHabitoComponent implements OnInit {
  formulario: FormGroup;
  tiposHabito: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      frecuencia: [1, [Validators.required, Validators.min(1)]],
      tipoHabitoId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>('http://localhost:8080/api/tipos-habito', { headers }).subscribe({
      next: tipos => this.tiposHabito = tipos,
      error: err => {
        console.error('Error cargando tipos de hábito', err);
        this.snack.open('No se pudieron cargar los tipos de hábito', 'Cerrar', { duration: 3000 });
        console.log('Tipos recibidos:', this.tiposHabito);

      }
    });
  }

  crearHabito(): void {
  if (this.formulario.invalid) return;

  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });


  const body = {
    nombre: this.formulario.value.nombre,
    descripcion: this.formulario.value.descripcion,
    frecuencia: this.formulario.value.frecuencia,
    tipo: { id: this.formulario.value.tipoHabitoId },
    completado: false,
    activo: true
  };

  this.http.post('http://localhost:8080/api/habitos', body, { headers }).subscribe({
    next: () => {
      this.snack.open('Hábito creado correctamente', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/ver-habitos']);
    },
    error: err => {
      this.snack.open('Error al crear hábito', 'Cerrar', { duration: 3000 });
      console.error(err);
      }
    });
  }

}



