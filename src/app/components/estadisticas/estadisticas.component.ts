import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  totalHabitosCumplidos: number = 0;
  totalDiasActivos: number = 0;
  rachaActual: number = 0;

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  async cargarEstadisticas() {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:8080/api/estadisticas/me', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      if (!res.ok) {
        console.error('No se pudo obtener estadísticas');
        return;
      }

      const data = await res.json();
      this.totalHabitosCumplidos = data.totalHabitosCumplidos;
      this.totalDiasActivos = data.totalDiasActivos;
      this.rachaActual = data.rachaActual;
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
    }
  }
}


