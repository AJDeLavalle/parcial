import { ChangeDetectorRef, Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { Repositorio } from '../../../repositorio/models/repositorio';
import { RepositorioService } from '../../../repositorio/services/repositorio';

const FOLLOWS_KEY = 'git_explorer_follows';

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
  siguiendo = false;

  constructor(
    private repositorioService: RepositorioService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(): void {
    this.siguiendo = this.getFollows().includes(this.usuario.id);

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

  toggleFollow(): void {
    const follows = this.getFollows();
    if (this.siguiendo) {
      const idx = follows.indexOf(this.usuario.id);
      follows.splice(idx, 1);
    } else {
      follows.push(this.usuario.id);
    }
    localStorage.setItem(FOLLOWS_KEY, JSON.stringify(follows));
    this.siguiendo = !this.siguiendo;
  }

  exportJson(): void {
    const data = {
      ...this.usuario,
      repos: this.repos,
      totalStars: this.totalStars
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.usuario.username}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  verReposUsuario(): void {
    this.router.navigate(['/repositorios'], {
      queryParams: { ids: this.usuario.repoIds.join(',') }
    });
  }

  private getFollows(): number[] {
    try {
      return JSON.parse(localStorage.getItem(FOLLOWS_KEY) ?? '[]');
    } catch {
      return [];
    }
  }
}
