import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Repositorio } from '../../models/repositorio';
import { RepositorioService } from '../../services/repositorio';

@Component({
  selector: 'app-detalle-repositorio',
  standalone: false,
  templateUrl: './detalle-repositorio.component.html',
  styleUrls: ['./detalle-repositorio.component.scss']
})
export class DetalleRepositorioComponent implements OnInit {
  repositorio: Repositorio | null = null;

  constructor(
    private route: ActivatedRoute,
    private repositorioService: RepositorioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.repositorioService.getRepositorios().subscribe(repos => {
      this.repositorio = repos.find(r => r.id === id) ?? null;
    });
  }

  volver(): void {
    this.router.navigate(['/repositorios']);
  }
}
