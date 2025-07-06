import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publicacion } from '../models/publicacion/publicacion.component';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  private apiUrl = 'http://localhost:8080/api/publicaciones';

  constructor(private http: HttpClient) {}

  obtenerTodas(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(this.apiUrl);
  }

  crear(publicacion: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.post(this.apiUrl, publicacion, { headers });
}
}

