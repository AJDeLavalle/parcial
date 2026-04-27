import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepositorioRoutingModule } from './repositorio-routing-module';
import { ListaRepositoriosComponent } from './components/lista-repositorios/lista-repositorios.component';
import { DetalleRepositorioComponent } from './components/detalle-repositorio/detalle-repositorio.component';

@NgModule({
  declarations: [ListaRepositoriosComponent, DetalleRepositorioComponent],
  imports: [CommonModule, RepositorioRoutingModule],
})
export class RepositorioModule {}
