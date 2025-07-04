import { Component } from '@angular/core';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListarComponent } from './components/listar/listar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegistrarComponent, NavbarComponent, ListarComponent],  // importa el componente
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}


