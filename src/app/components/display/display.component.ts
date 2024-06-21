import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TimerService } from 'services/timer.service';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [],
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayComponent {
  seconds = 0;
  manTimerImg = '';
  cdr = inject(ChangeDetectorRef);
  constructor(private timerService: TimerService) {
    this.timerService.getSeconds
      .pipe(takeUntilDestroyed())
      .subscribe((seconds) => {
        this.seconds = seconds;
        const typeOfImg = this.getImage();
        if (
          this.manTimerImg !== `assets/images/manTimer${typeOfImg ?? ''}.png`
        ) {
          this.manTimerImg = `assets/images/manTimer${typeOfImg ?? ''}.png`;
          this.cdr.markForCheck();
        }
      });
  }
  getImage() {
    let typeOfImg: null | number = null;
    if (this.seconds >= 80 * 60) {
      typeOfImg = 80;
    } else if (this.seconds >= 40 * 60) {
      typeOfImg = 40;
    }
    return typeOfImg;
  }
}
