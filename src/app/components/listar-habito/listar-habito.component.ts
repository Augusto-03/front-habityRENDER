import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listar-habito',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './listar-habito.component.html',
  styleUrls: ['./listar-habito.component.css']
})
export class ListarHabitoComponent implements OnInit {
  habitos: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Inicia sesión primero.');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.http.get<any[]>('http://localhost:8080/api/habitos', { headers }).subscribe({
      next: data => {
        console.log('Respuesta del backend:', data); // 👈 Verás los hábitos en consola
        console.log('Cantidad recibida:', Array.isArray(data) ? data.length : Object.keys(data).length);

        this.habitos = Array.isArray(data) ? data : Object.values(data);
        console.log('this.habitos:', this.habitos);
      },
      error: () => {
        alert('Error cargando hábitos');
      }
    });
  }

  irARegistrarHabito() {
    this.router.navigate(['/registrar-habito']);
  }
  irARegistrarTipo() {
  this.router.navigate(['/registrar-tipo']);
  }

}


