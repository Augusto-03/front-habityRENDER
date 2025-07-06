import { Component, OnInit } from '@angular/core';
import { Publicacion } from '../../models/publicacion/publicacion.component';
import { PublicacionService } from '../../services/publicacion.service';
import { PostComponent } from "../post/post.component";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-community',
  standalone: true,
  imports: [PostComponent, FormsModule],
  templateUrl: './comunity.component.html',
  styleUrls: ['./comunity.component.css']
})
export class CommunityComponent implements OnInit {
  postContent = '';
  postType: 'logro' | 'ayuda' | 'comentario' = 'comentario';
  posts: Publicacion[] = [];

  constructor(private publicacionService: PublicacionService) {}

  ngOnInit(): void {
    this.publicacionService.obtenerTodas().subscribe((data: Publicacion[]) => {
      this.posts = data.reverse(); // Para mostrar la más reciente arriba
    });
  }

  setType(tipo: 'logro' | 'ayuda' | 'comentario') {
    this.postType = tipo;
  }

  publicar() {
    const contenido = this.postContent.trim();
    if (!contenido) return;

    const nuevaPublicacion = {
      contenido: this.postContent,
      tipo: this.postType
    };
    this.publicacionService.crear(nuevaPublicacion).subscribe((res: any) => {
      this.posts.unshift(res);
      this.postContent = '';
      this.postType = 'comentario';
    });
  }
}


