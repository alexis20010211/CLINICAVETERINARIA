import { Routes } from '@angular/router';
import { MascotasComponent } from './mascotas/mascotas.component';
import { CitasComponent } from './citas/citas.component';
import { HistorialComponent } from './historial/historial.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component'; // <-- Importa Home

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'mascotas', component: MascotasComponent },
  { path: 'citas', component: CitasComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // <-- Redirige al home
  { path: '**', redirectTo: '/home' } // <-- Ruta comodín
];
