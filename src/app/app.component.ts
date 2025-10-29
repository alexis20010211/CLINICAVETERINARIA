// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [RouterModule]  // Necesario para <router-outlet>
})
export class AppComponent {
  title = 'Clínica Veterinaria';
}
