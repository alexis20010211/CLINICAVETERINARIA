import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { CitasComponent } from './citas/citas.component';
import { HistorialComponent } from './historial/historial.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  // Ruta pública de login
  { path: 'login', component: LoginComponent },

  // Dashboard: contenedor para todas las secciones
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },           // Página principal
      { path: 'mascotas', component: MascotasComponent },   // Gestión de mascotas
      { path: 'citas', component: CitasComponent },         // Gestión de citas
      { path: 'historial', component: HistorialComponent }, // Historial de mascotas/citas
      { path: 'usuarios', component: UsuarioComponent },    // Gestión de usuarios (solo admin)
      { path: '', redirectTo: 'home', pathMatch: 'full' },  // Por defecto al dashboard
    ]
  },

  // Redirecciones
  { path: '', redirectTo: 'login', pathMatch: 'full' },    // Inicio de sesión por defecto
  { path: '**', redirectTo: 'login' }                     // Cualquier ruta no encontrada va a login
];
