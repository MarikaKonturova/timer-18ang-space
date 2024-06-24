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
import { SettingsService } from 'services/settings.service';
import { TimerService } from 'services/timer.service';
import { SecondsToMinSecPipe } from '../../pipes/seconds-to-min-sec.pipe';
import { combineLatest, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-circle',
  standalone: true,
  templateUrl: './circle.component.html',
  styleUrl: './circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NgClass, SecondsToMinSecPipe],
})
export class CircleComponent {
  private lastPosition = 0;
  private prevVal = 0;
  private maxPoints = 120;
  @ViewChild('range') rangeElement!: ElementRef;
  @ViewChild('dial') dialElement!: ElementRef;
  canSlide = false;

  //zaglushka chto delat'
  private renderedSlider = false;
  minutes = 0;
  mode!: Mode;

  constructor(
    private settingsService: SettingsService,
    private timerService: TimerService,
    private renderer: Renderer2
  ) {
    const mode$ = this.settingsService.mode;
    const seconds$ = this.timerService.seconds;
    combineLatest([mode$, seconds$])
      .pipe(takeUntilDestroyed(), distinctUntilChanged())
      .subscribe(([mode, seconds]) => {
        if (mode !== this.mode) {
          this.renderedSlider = false;
        }
        this.mode = mode;
        this.minutes = Math.floor(seconds / 60);
        //i'm not sure about this, cause it's run when the mode is settings and seconds === 0 and i get typeerror 'rangeElement' is undefined so i did additional check on the element existence
        const canceledTimerCase =
          mode === 'settings' && seconds === 0 && this.rangeElement;

        if (mode === 'timer') {
          if (!this.renderedSlider) {
            this.renderedSlider = true;
          } else {
            console.log('blabla');
            this.updateStylesFromPoints(this.minutes);
          }
        } else if (canceledTimerCase) {
          this.updateStylesFromPoints(this.minutes);
        }
      });
  }

  rangeSliderStart(): void {
    this.canSlide = true;
  }
  rangeSliderStop(): void {
    this.canSlide = false;
  }

  updatePointsFromStyles(event: MouseEvent | TouchEvent): void {
    const position = this.pointerEvents(event);
    const range = this.rangeElement.nativeElement;

    //calculations to define deg, prevVal and lastPosition of pointer
    const coords = {
      x: position.x - range.offsetLeft,
      y: position.y - range.offsetTop,
    };
    const radius = range.offsetWidth / 2;
    const atan = Math.atan2(coords.x - radius, coords.y - radius);
    let deg = Math.ceil(-atan / (Math.PI / 180) + 180);

    if (this.prevVal <= 1 && this.lastPosition - position.x >= 0) deg = 0;
    if (this.prevVal >= 359 && this.lastPosition - position.x <= 0) deg = 360;
    this.prevVal = deg;
    this.lastPosition = position.x;

    // change value from service and render
    const points = Math.ceil((deg * this.maxPoints) / 360);
    this.timerService.changeSeconds(points * 60);
    this.renderStyle(radius, deg);
  }

  updateStylesFromPoints(points: number) {
    const range = this.rangeElement.nativeElement;
    const radius = range.offsetWidth / 2;

    // Convert points to degrees
    const deg = Math.ceil((points * 360) / this.maxPoints);

    this.renderStyle(radius, deg);
  }

  renderStyle(radius: number, deg: number) {
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
    if (deg <= 180) {
      this.renderer.setStyle(
        range.querySelector('.right .blocker'),
        'transform',
        `rotate(${deg}deg)`
      );
      this.renderer.setStyle(
        range.querySelector('.left .blocker'),
        'transform',
        'rotate(0)'
      );
    } else {
      //in the else block there is render bug

      this.renderer.setStyle(
        range.querySelector('.right .blocker'),
        'transform',
        'rotate(180deg)'
      );
      this.renderer.setStyle(
        range.querySelector('.left .blocker'),
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
