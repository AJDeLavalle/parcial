import { ChangeDetectorRef, Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { Repositorio } from '../../../repositorio/models/repositorio';
import { RepositorioService } from '../../../repositorio/services/repositorio';

@Component({
  selector: 'app-detalle-usuario',
  standalone: false,
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss']
})
export class DetalleUsuarioComponent implements OnChanges {
  @Input() usuario!: Usuario;
  @Output() cerrar = new EventEmitter<void>();

  repos: Repositorio[] = [];
  totalStars = 0;
  techStack: string[] = [];
  heatmapCells: number[] = [];

  constructor(
    private repositorioService: RepositorioService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(): void {
    this.repositorioService.getRepositorios().subscribe(all => {
      this.repos = all.filter(r => this.usuario.repoIds.includes(r.id));
      this.totalStars = this.repos.reduce((sum, r) => sum + r.stars, 0);
      this.techStack = [...new Set(this.repos.map(r => r.language))];
      this.heatmapCells = Array.from({ length: 70 }, (_, i) => {
        const v = (this.usuario.id * 17 + i * 13) % 10;
        return v > 7 ? 1 : v > 5 ? 0.65 : v > 3 ? 0.35 : 0.1;
      });
      this.cdr.detectChanges();
    });
  }

  verReposUsuario(): void {
    this.router.navigate(['/repositorios'], {
      queryParams: { ids: this.usuario.repoIds.join(',') }
    });
  }
}
