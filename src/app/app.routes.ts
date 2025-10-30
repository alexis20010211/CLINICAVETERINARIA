import { Routes } from '@angular/router';

// Componentes
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { CitasComponent } from './citas/citas.component';
import { HistorialComponent } from './historial/historial.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { HomeComponent } from './home/home.component';

// Guards
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';

export const routes: Routes = [
  // Landing público
  { path: '', component: LandingComponent },

  // Ruta pública de login
  { path: 'login', component: LoginComponent },

  // Dashboard: contenedor para todas las secciones protegidas
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Protege todo el dashboard
    children: [
      // Cliente y Admin pueden ver home
      { 
        path: 'home', 
        component: HomeComponent, 
        canActivate: [RoleGuard], 
        data: { roles: ['cliente', 'admin'] } 
      },

      // Solo Admin puede acceder
      { path: 'mascotas', component: MascotasComponent, canActivate: [RoleGuard], data: { roles: ['admin'] } },
      { path: 'citas', component: CitasComponent, canActivate: [RoleGuard], data: { roles: ['admin'] } },
      { path: 'historial', component: HistorialComponent, canActivate: [RoleGuard], data: { roles: ['admin'] } },
      { path: 'usuarios', component: UsuarioComponent, canActivate: [RoleGuard], data: { roles: ['admin'] } },

      // Ruta por defecto dentro del dashboard
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  // Redirección por seguridad (cualquier ruta no encontrada)
  { path: '**', redirectTo: '' } // Redirige a landing
];
