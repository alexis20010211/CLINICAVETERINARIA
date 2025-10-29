import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from './service/usuario.service';
import { Usuario } from './model/usuario';

@Component({
  selector: 'app-usuario',
  standalone: true,
  templateUrl: './usuario.html',
  styleUrls: ['./usuario.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class UsuarioComponent implements OnInit {

  usuarioForm!: FormGroup;
  usuarios: Usuario[] = [];
  usuarioActual: Usuario | null = null; // usuario logueado

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    // Inicializar formulario
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['cliente', Validators.required],
    });

    // Cargar usuario logueado desde localStorage
    const usuarioLogueado = localStorage.getItem('usuario');
    if (usuarioLogueado) {
      this.usuarioActual = JSON.parse(usuarioLogueado);
    }

    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    // Si es admin ve todos los usuarios, si es cliente solo se ve a sí mismo
    if (this.usuarioActual?.rol === 'admin') {
      this.usuarios = this.usuarioService.getUsuarios();
    } else if (this.usuarioActual) {
      this.usuarios = [this.usuarioActual];
    }
  }

  registrarUsuario(): void {
    if (!this.esAdmin()) {
      alert('Solo el administrador puede registrar usuarios');
      return;
    }

    if (this.usuarioForm.valid) {
      const nuevoUsuario = this.usuarioForm.value;
      this.usuarioService.addUsuario(nuevoUsuario);
      this.usuarioForm.reset();
      this.cargarUsuarios();
    }
  }

  eliminarUsuario(id: number): void {
    if (!this.esAdmin()) {
      alert('Solo el administrador puede eliminar usuarios');
      return;
    }

    this.usuarioService.eliminarUsuario(id);
    this.cargarUsuarios();
  }

  esAdmin(): boolean {
    return this.usuarioActual?.rol === 'admin';
  }
}
