import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroHabitoTrackerComponent } from '../registro-habito-tracker/registro-habito-tracker.component';

@Component({
  selector: 'app-progreso-habito',
  standalone: true,
  imports: [CommonModule, RegistroHabitoTrackerComponent],
  templateUrl: './progreso-habito.component.html',
  styleUrls: ['./progreso-habito.component.css']
})
export class ProgresoHabitoComponent implements OnInit {
  habitos: any[] = [];

  async ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Sesión no iniciada');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/habitos', {
        headers: { 'Authorization': 'Bearer ' + token }
      });

      if (res.ok) {
        this.habitos = await res.json();
        console.log('Hábitos cargados:', this.habitos);
      } else {
        console.error('Error al obtener hábitos:', res.status);
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  }
}



