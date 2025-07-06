import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-habito-tracker',
  templateUrl: './registro-habito-tracker.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./registro-habito-tracker.component.css']
})
export class RegistroHabitoTrackerComponent implements OnChanges {
  @Input() habito: any;

  bloques: Date[][] = [];
  bloqueActual = 0;
  registros: Date[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['habito'] && this.habito) {
      this.generarBloques();
      this.cargarRegistros();
    }
  }

  generarBloques(): void {
    const bloques = [];
    const hoy = new Date();
    const inicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);

    for (let b = 0; b < 3; b++) {
      const dias = [];
      for (let d = 0; d < 30; d++) {
        const fecha = new Date(inicio);
        fecha.setDate(inicio.getDate() + d + b * 30);
        dias.push(new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 12));
      }
      bloques.push(dias);
    }

    this.bloques = bloques;
  }

  async cargarRegistros() {
    const token = localStorage.getItem('token');
    if (!token || !this.habito?.id) return;

    const res = await fetch(`http://localhost:8080/api/registro-habitos/habito/${this.habito.id}`, {
      headers: { 'Authorization': 'Bearer ' + token }
    });

    if (res.ok) {
      const data = await res.json();
      this.registros = data.map((r: any) => {
        const [year, month, day] = r.fecha.split('-').map(Number);
        return new Date(year, month - 1, day, 12); // fuerza hora local
      });
    }
  }

  estaCumplido(fecha: Date): boolean {
    return this.registros.some(f => f.toDateString() === fecha.toDateString());
  }

  async toggleFecha(fecha: Date) {
    const token = localStorage.getItem('token');
    const fechaISO = fecha.toISOString().split('T')[0];
    const yaCumplido = this.estaCumplido(fecha);

    if (!token || !this.habito?.id) return;

    if (yaCumplido) {
      await fetch(`http://localhost:8080/api/registro-habitos/delete`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ habitoId: this.habito.id, fecha: fechaISO })
      });
      this.registros = this.registros.filter(f => f.toDateString() !== fecha.toDateString());
    } else {
      await fetch(`http://localhost:8080/api/registro-habitos`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ habitoId: this.habito.id, fecha: fechaISO, cumplido: true })
      });
      this.registros.push(fecha);
    }
  }

  cambiarBloque(direccion: number) {
    const nuevo = this.bloqueActual + direccion;
    if (nuevo >= 0 && nuevo < this.bloques.length) {
      this.bloqueActual = nuevo;
    }
  }
}


