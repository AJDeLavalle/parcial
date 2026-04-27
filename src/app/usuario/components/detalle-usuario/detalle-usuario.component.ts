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

  constructor(
    private repositorioService: RepositorioService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(): void {
    this.repositorioService.getRepositorios().subscribe(all => {
      this.repos = all.filter(r => this.usuario.repoIds.includes(r.id));
      this.cdr.detectChanges();
    });
  }

  verReposUsuario(): void {
    this.router.navigate(['/repositorios'], {
      queryParams: { ids: this.usuario.repoIds.join(',') }
    });
  }
}
