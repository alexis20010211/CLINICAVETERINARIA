import { Routes } from '@angular/router';

// Componentes públicos
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth/login/login.component';

// Componentes protegidos dentro del dashboard
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { CitasComponent } from './citas/citas.component';
import { HistorialComponent } from './historial/historial.component';

// Guard de autenticación
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  // 🔹 Página pública (Landing)
  { path: '', component: LandingComponent },

  // 🔹 Login
  { path: 'login', component: LoginComponent },

  // 🔹 Sección protegida del Dashboard
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // protege toda la sección
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // redirección por defecto
      { path: 'home', component: HomeComponent },
      { path: 'citas', component: CitasComponent },
      { path: 'historial', component: HistorialComponent }
    ]
  },

  // 🔹 Cualquier ruta no válida redirige al inicio
  { path: '**', redirectTo: '', pathMatch: 'full' }
];