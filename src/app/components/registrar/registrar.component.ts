import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  standalone: true, 
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
  tipo: string = 'comentario';

  @ViewChild('contenidoInput') contenidoInput!: ElementRef<HTMLTextAreaElement>;

  setTipo(nuevoTipo: string): void {
    this.tipo = nuevoTipo;
  }

  publicar(event: Event): void {
    event.preventDefault();

    const contenido = this.contenidoInput.nativeElement.value.trim();

    if (!contenido) return;

    console.log('Contenido:', contenido);
    console.log('Tipo:', this.tipo);

    this.contenidoInput.nativeElement.value = '';
    this.tipo = 'comentario';
  }
}



