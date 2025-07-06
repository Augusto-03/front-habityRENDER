export interface Publicacion {
  id?: number;
  contenido: string;
  tipo: 'logro' | 'ayuda' | 'comentario';
  fechaCreacion?: string;
  usuarioId?: number;
}


