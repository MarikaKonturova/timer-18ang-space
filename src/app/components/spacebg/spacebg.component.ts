import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-spacebg',
  standalone: true,
  imports: [],
  template: ``,
  styleUrl: './spacebg.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpacebgComponent implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.createStars(200);
  }

  createStars(count: number): void {
    for (let i = 0; i < count; i++) {
      const star = this.renderer.createElement('div');
      this.renderer.addClass(star, 'star');
      this.renderer.setStyle(star, 'top', `${Math.random() * 100}%`);
      this.renderer.setStyle(star, 'left', `${Math.random() * 100}%`);
      this.renderer.setStyle(star, 'animationDelay', `${Math.random() * 10}s`);
      this.renderer.appendChild(this.el.nativeElement, star);
    }
  }
}
