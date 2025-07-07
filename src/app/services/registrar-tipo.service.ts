import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TipoHabito {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class TipoHabitoService {
  private apiUrl = 'http://localhost:8080/api/tipos-habito';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<TipoHabito[]> {
    return this.http.get<TipoHabito[]>(this.apiUrl);
  }

  crearTipoHabito(tipo: { nombre: string }) {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.post('http://localhost:8080/api/tipos-habito', tipo, { headers });
}

}

