import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { USUARIOS_DATA } from '../../data/usuarios.data';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
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
      // Guarda el token simulado y el rol del usuario
      localStorage.setItem('token', 'fake-jwt-token'); 
      localStorage.setItem('role', usuario.rol); // 'admin' o 'cliente'

      // Guarda info del usuario (opcional)
      localStorage.setItem('usuario', JSON.stringify(usuario));

      // Redirige según rol
      if (usuario.rol === 'admin') {
        this.router.navigate(['/dashboard/mascotas']);
      } else {
        this.router.navigate(['/dashboard/home']);
      }
    } else {
      this.error = 'Correo o contraseña incorrectos';
      this.correo = '';
      this.password = '';
    }
  }
}
