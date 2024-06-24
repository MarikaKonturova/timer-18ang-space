import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Mode } from 'models/mode.model';
import { filter, withLatestFrom } from 'rxjs';
import { SettingsService } from 'services/settings.service';
import { TimerService } from 'services/timer.service';

@Component({
  selector: 'app-circle',
  standalone: true,
  templateUrl: './circle.component.html',
  styleUrl: './circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NgClass],
})
export class CircleComponent {
  private maxPoints = 120;
  @ViewChild('range') rangeElement!: ElementRef;
  @ViewChild('dial') dialElement!: ElementRef;
  canSlide = false;
  minutes = 0;
  mode!: Mode;

  constructor(
    private settingsService: SettingsService,
    private timerService: TimerService,
    private renderer: Renderer2
  ) {
    const mode$ = this.settingsService.mode;
    const seconds$ = this.timerService.seconds;
    seconds$
      .pipe(
        withLatestFrom(mode$),
        filter(([seconds, mode]) => {
          //because timer will be with 59 seconds already
          return mode === 'timer' ? seconds % 60 === 59 : true;
        }),
        takeUntilDestroyed()
      )
      .subscribe(([seconds, mode]) => {
        this.mode = mode;
        this.minutes = Math.floor(seconds / 60);

        if (mode === 'timer' || (seconds === 0 && this.rangeElement)) {
          this.updateStylesFromPoints(this.minutes);
        }
      });
  }

  rangeSliderStart(): void {
    if (this.mode !== 'settings') return;
    this.canSlide = true;
  }
  rangeSliderStop(): void {
    if (this.mode !== 'settings') return;
    this.canSlide = false;
  }

  updatePointsFromStyles(event: MouseEvent | TouchEvent): void {
    if (this.mode !== 'settings' || !this.canSlide) return;

    const position = this.pointerEvents(event);
    const range = this.rangeElement.nativeElement;

    const coords = {
      x: position.x - range.offsetLeft,
      y: position.y - range.offsetTop,
    };

    const radius = range.offsetWidth / 2;
    const atan = Math.atan2(coords.x - radius, coords.y - radius);
    let deg = Math.ceil(-atan / (Math.PI / 180) + 180);

    // change value from service and render
    const points = Math.ceil((deg * this.maxPoints) / 360);
    this.timerService.changeSeconds(points * 60);
    this.renderStyle(radius, points);
  }

  updateStylesFromPoints(points: number) {
    const range = this.rangeElement.nativeElement;
    const radius = range.offsetWidth / 2;

    this.renderStyle(radius, points);
  }

  renderStyle(radius: number, points: number) {
    const deg = (points * 360) / this.maxPoints;

    const range = this.rangeElement.nativeElement;
    const dial = this.dialElement.nativeElement;
    const x =
      Math.ceil((radius - 5) * Math.sin((deg * Math.PI) / 180)) + radius + 'px';
    const y =
      Math.ceil((radius - 5) * -Math.cos((deg * Math.PI) / 180)) +
      radius +
      'px';

    // Move dial
    this.renderer.setStyle(dial, 'transform', `translate(${x}, ${y})`);

    // Show range progress
    const rightBlocker = range.querySelector('.right .blocker');
    const leftBlocker = range.querySelector('.left .blocker');
    if (deg <= 180) {
      this.renderer.setStyle(rightBlocker, 'transform', `rotate(${deg}deg)`);
      this.renderer.setStyle(leftBlocker, 'transform', 'rotate(0)');
    } else {
      this.renderer.setStyle(rightBlocker, 'transform', 'rotate(180deg)');
      this.renderer.setStyle(
        leftBlocker,
        'transform',
        `rotate(${deg - 180}deg)`
      );
    }
  }
  //needs to be fix to work on phones
  private pointerEvents(event: MouseEvent | TouchEvent): {
    x: number;
    y: number;
  } {
    const pos = { x: 0, y: 0 };
    if (event.type.startsWith('touch')) {
      const touch = (event as TouchEvent).changedTouches[0];
      pos.x = touch.pageX;
      pos.y = touch.pageY;
    } else if (event.type.startsWith('mouse')) {
      pos.x = (event as MouseEvent).pageX;
      pos.y = (event as MouseEvent).pageY;
    }

    return pos;
  }
}
