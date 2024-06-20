import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Stars } from '../../models/stars.model';

@Component({
  selector: 'app-spacebg',
  standalone: true,
  template: `
    <div class="starsContainer">
      @for (star of stars; track $index) {
      <div
        [class]="star.class"
        [style.top]="star.top"
        [style.left]="star.left"
        [style.animation-delay]="star.animationDelay"
      ></div>
      }
    </div>
  `,
  styleUrl: './spacebg.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpacebgComponent implements OnInit {
  constructor() {}
  stars: Stars[] = [];

  ngOnInit(): void {
    this.createStars(200);
  }

  createStars(count: number): void {
    for (let i = 0; i < count; i++) {
      this.stars.push({
        class: 'star',
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 10}s`,
      });
    }
  }
}
