import { Routes } from '@angular/router';
import { RegistrarComponent } from './components/registrar/registrar.component';

export const routes: Routes = [
  { path: 'registrar', component: RegistrarComponent },
  { path: '', redirectTo: 'registrar', pathMatch: 'full' },
];

