import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  usuario: any = {};

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No tienes sesión activa.');
      window.location.href = '/login';
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/usuarios/perfilObtener`, {
        headers: { 'Authorization': 'Bearer ' + token }
      });

      if (res.ok) {
        const usuario = await res.json();
        this.usuario = usuario;
      } else {
        alert('No se pudo cargar el perfil.');
      }
    } catch (err) {
      alert('Error de conexión');
      console.error(err);
    }
  }

  cerrarSesion() {
    localStorage.clear();
    window.location.href = '/login';
  }
}

