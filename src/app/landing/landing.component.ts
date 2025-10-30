import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule], // CommonModule incluye NgIf, NgFor
  templateUrl: './landing.html',
  styleUrls: ['./landing.css']
})
export class LandingComponent implements AfterViewInit, OnInit {

  // Formulario de contacto
  nombre: string = '';
  telefono: string = '';
  correo: string = '';
  servicio: string = '';

  // Control tarjeta login/registro
  mostrarLoginCard: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Mostrar tarjeta login solo si NO hay usuario logueado
    this.mostrarLoginCard = !localStorage.getItem('usuario');
  }

  ngAfterViewInit(): void {
    const video = document.querySelector('video.video-bg') as HTMLVideoElement;
    if (!video) return;

    // Configuración inicial del video
    video.muted = true;
    video.volume = 0;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;

    // Reproducir automáticamente
    video.play().catch(() => console.warn('No se pudo reproducir el video automáticamente.'));

    // Mantener mute y volumen bloqueados
    const observer = new MutationObserver(() => {
      if (!video.muted) (video.muted as any) = true;
      if (video.volume !== 0) (video.volume as any) = 0;
    });
    observer.observe(video, { attributes: true, attributeFilter: ['muted', 'volume'] });

    setInterval(() => {
      if (!video.muted) (video.muted as any) = true;
      if (video.volume !== 0) (video.volume as any) = 0;
    }, 100);
  }

  // Enviar formulario de contacto
  enviarFormulario() {
    if (this.nombre && this.telefono && this.correo && this.servicio) {
      console.log('Formulario enviado:', {
        nombre: this.nombre,
        telefono: this.telefono,
        correo: this.correo,
        servicio: this.servicio
      });
      alert('Gracias por contactarnos. Te escribiremos pronto.');
      this.nombre = '';
      this.telefono = '';
      this.correo = '';
      this.servicio = '';
    } else {
      alert('Por favor completa todos los campos.');
    }
  }

  // Navegación login/registro
  irRegistro(): void {
    this.router.navigate(['/registro']);
  }

  irLogin(): void {
    this.router.navigate(['/login']);
  }
}
