import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  filtroActivo = false;

  constructor(
    private repositorioService: RepositorioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idsParam = this.route.snapshot.queryParamMap.get('ids');
    this.filtroActivo = !!idsParam;

    this.repositorioService.getRepositorios().subscribe(data => {
      if (idsParam) {
        const ids = idsParam.split(',').map(Number);
        this.repositorios = data.filter(r => ids.includes(r.id));
      } else {
        this.repositorios = data;
      }
      this.cargando = false;
    });
  }

  verDetalle(id: number): void {
    this.router.navigate(['/repositorios', id]);
  }

  verTodos(): void {
    this.router.navigate(['/repositorios']);
  }
}
