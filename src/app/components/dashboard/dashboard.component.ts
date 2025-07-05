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
  habitos: any[] = [];

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No tienes sesión activa.');
      window.location.href = '/login';
      return;
    }

    try {
      const perfilRes = await fetch(`http://localhost:8080/api/usuarios/perfilObtener`, {
        headers: { 'Authorization': 'Bearer ' + token }
      });

      if (perfilRes.ok) {
        this.usuario = await perfilRes.json();
        console.log('👤 Usuario cargado:', this.usuario);

        // Obtener hábitos registrados
        const habitosRes = await fetch(`http://localhost:8080/api/registro-habitos/usuario/${this.usuario.id}`, {
          headers: { 'Authorization': 'Bearer ' + token }
        });

        if (habitosRes.ok) {
          this.habitos = await habitosRes.json();
          console.log('📌 Hábitos registrados:', this.habitos);
        } else {
          console.error('Error cargando hábitos del usuario');
        }

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


