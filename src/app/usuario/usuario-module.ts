import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing-module';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { DetalleUsuarioComponent } from './components/detalle-usuario/detalle-usuario.component';

@NgModule({
  declarations: [ListaUsuariosComponent, DetalleUsuarioComponent],
  imports: [CommonModule, UsuarioRoutingModule],
})
export class UsuarioModule {}
