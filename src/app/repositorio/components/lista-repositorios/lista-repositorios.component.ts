import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Repositorio } from '../../models/repositorio';
import { RepositorioService } from '../../services/repositorio';

@Component({
  selector: 'app-lista-repositorios',
  standalone: false,
  templateUrl: './lista-repositorios.component.html',
  styleUrls: ['./lista-repositorios.component.scss']
})
export class ListaRepositoriosComponent implements OnInit {
  repositorios: Repositorio[] = [];
  cargando = true;

  constructor(private repositorioService: RepositorioService, private router: Router) {}

  ngOnInit(): void {
    this.repositorioService.getRepositorios().subscribe(data => {
      this.repositorios = data;
      this.cargando = false;
    });
  }

  verDetalle(id: number): void {
    this.router.navigate(['/repositorios', id]);
  }
}
