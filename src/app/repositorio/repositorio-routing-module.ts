import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaRepositoriosComponent } from './components/lista-repositorios/lista-repositorios.component';
import { DetalleRepositorioComponent } from './components/detalle-repositorio/detalle-repositorio.component';

const routes: Routes = [
  { path: '', component: ListaRepositoriosComponent },
  { path: ':id', component: DetalleRepositorioComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepositorioRoutingModule {}
