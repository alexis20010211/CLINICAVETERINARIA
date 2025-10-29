import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { USUARIOS_DATA } from '../../data/usuarios.data';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private usuarios: Usuario[] = [...USUARIOS_DATA];

  getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  getUsuarioByCorreo(correo: string): Usuario | undefined {
    return this.usuarios.find((u) => u.correo === correo);
  }

  addUsuario(usuario: Usuario): void {
    usuario.id = this.usuarios.length > 0 ? Math.max(...this.usuarios.map((u) => u.id)) + 1 : 1;
    this.usuarios.push(usuario);
  }

  eliminarUsuario(id: number): void {
    this.usuarios = this.usuarios.filter((u) => u.id !== id);
  }
}
