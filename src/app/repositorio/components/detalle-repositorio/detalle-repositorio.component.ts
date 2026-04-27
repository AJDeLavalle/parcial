import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
    private location: Location,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.repositorioService.getRepositorios().subscribe(repos => {
      this.repositorio = repos.find(r => r.id === id) ?? null;
      this.cdr.detectChanges();
    });
  }

  volver(): void {
    this.location.back();
  }
}
