import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css']
})
export class AuthComponent {
  correo: string = '';
  password: string = '';
  error: string = '';

  login() {
    // Aquí pondrías la lógica de login con tu AuthService o datos locales
    const role = this.correo === 'admin@clinica.com' ? 'admin' : 'cliente';
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('role', role);

    if (role === 'admin') {
      location.href = '/dashboard/mascotas';
    } else {
      location.href = '/dashboard/home';
    }
  }
}
