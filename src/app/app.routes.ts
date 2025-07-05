import { Routes } from '@angular/router';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { RegistrarHabitoComponent } from './components/registrar-habito/registrar-habito.component';
import { ListarHabitoComponent } from './components/listar-habito/listar-habito.component';


export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'registro', component: RegistrarUsuarioComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard] 
  },
  {
    path: 'registrar-habito',
    component: RegistrarHabitoComponent,
    canActivate: [authGuard]
  },
  {
    path: 'ver-habitos',
    component: ListarHabitoComponent,
    canActivate: [authGuard]
  }
];




