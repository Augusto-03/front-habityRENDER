import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegistroHabitoTrackerComponent } from '../registro-habito-tracker/registro-habito-tracker.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, RegistroHabitoTrackerComponent],
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

        const habitosRes = await fetch(`http://localhost:8080/api/habitos`, {
          headers: { 'Authorization': 'Bearer ' + token } 
        });

        if (habitosRes.ok) {
          this.habitos = await habitosRes.json();
          console.log('📌 Hábitos registrados:', this.habitos);
        } else {
          console.error('Error cargando hábitos');
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


