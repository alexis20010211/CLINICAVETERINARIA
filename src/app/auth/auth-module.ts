import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    LoginComponent // Se importa aquí, no se declara ni se exporta
  ]
})
export class AuthModule { }
