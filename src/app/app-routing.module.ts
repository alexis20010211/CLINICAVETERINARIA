import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar los componentes
import { HomeComponent } from './home/home.component';
import { CitasComponent } from './citas/citas.component';
import { HistorialComponent } from './historial/historial.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'citas', component: CitasComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'login', component: LoginComponent },

  // Redirige a /home si la ruta está vacía
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Ruta comodín para cualquier ruta no definida
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
