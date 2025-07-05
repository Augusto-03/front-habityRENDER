import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario/usuario.component';
import { RegistroUsuario } from '../models/registro-usuario/registro-usuario.component';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  login(datos: { email: string; password: string }): Observable<{ token: string }> {
  return this.http.post<{ token: string }>('http://localhost:8080/api/auth/login', datos);
  }
  private API = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API);
  }

  registrar(datos: RegistroUsuario): Observable<Usuario> {
  return this.http.post<Usuario>(`${this.API}/register`, datos);
  }

}


