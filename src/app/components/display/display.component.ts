import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest } from 'rxjs';
import { SettingsService } from 'services/settings.service';
import { TimerService } from 'services/timer.service';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayComponent {
  seconds = 0;
  manTimerImg = '';
  cdr = inject(ChangeDetectorRef);

  constructor(
    private timerService: TimerService,
    private settingsService: SettingsService
  ) {
    const mode$ = this.settingsService.mode;
    const seconds$ = this.timerService.seconds;

    combineLatest([mode$, seconds$])
      .pipe(takeUntilDestroyed())
      .subscribe(([mode, seconds]) => {
        this.seconds = seconds;
        if (mode === 'settings') {
          const typeOfImg = this.getImage();
          const image = `assets/images/manTimer${typeOfImg ?? ''}.png`;
          if (this.manTimerImg !== image) {
            this.manTimerImg = image;
            this.cdr.markForCheck();
          }
        }
      });
  }
  getImage() {
    if (this.seconds >= 80 * 60) {
      return 80;
    } else if (this.seconds >= 40 * 60) {
      return 40;
    }
    return null;
  }
}
