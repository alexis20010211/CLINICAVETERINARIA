import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitasComponent } from './citas.component'; // ✅ importación directa del standalone

@NgModule({
  imports: [
    CommonModule,
    CitasComponent // ✅ se importa, NO se declara
  ],
  exports: [
    CitasComponent // ✅ puedes exportarlo si se usa fuera
  ]
})
export class CitasModule {}
