import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { USUARIOS_DATA } from '../../data/usuarios.data';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  correo: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router) {}

  login() {
    // Busca al usuario por correo y contraseña
    const usuario = USUARIOS_DATA.find(
      (u) => u.correo === this.correo && u.password === this.password
    );

    if (usuario) {
      // Guarda el usuario logueado en localStorage
      localStorage.setItem('usuario', JSON.stringify(usuario));

      // Redirige al Dashboard
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Correo o contraseña incorrectos';
      this.correo = '';
      this.password = '';
    }
  }
}
