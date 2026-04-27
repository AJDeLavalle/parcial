import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-detalle-usuario',
  standalone: false,
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss']
})
export class DetalleUsuarioComponent {
  @Input() usuario!: Usuario;
  @Output() cerrar = new EventEmitter<void>();
}
