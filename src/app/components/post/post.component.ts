import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() content = '';
  @Input() type: 'logro' | 'ayuda' | 'comentario' = 'comentario';
}

