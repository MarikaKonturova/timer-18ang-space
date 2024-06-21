import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, takeWhile } from 'rxjs';

import { SecondsToMinSecPipe } from 'pipes/seconds-to-min-sec.pipe';
import { SettingsService } from 'services/settings.service';
import { TimerService } from 'services/timer.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [SecondsToMinSecPipe],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnInit {
  seconds = 0;

  cdr = inject(ChangeDetectorRef);
  destroyRef = inject(DestroyRef);
  constructor(
    private settingsService: SettingsService,
    private timerService: TimerService
  ) {
    this.timerService.seconds
      .pipe(takeUntilDestroyed())
      .subscribe((seconds) => {
        this.seconds = seconds;
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    this.startTimer();
  }
  startTimer(): void {
    interval(1000)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        takeWhile(() => this.seconds > 0)
      )
      .subscribe({
        next: () => {
          this.seconds--;
          this.cdr.markForCheck();
        },
        complete: () => (this.seconds > 0 ? this.cancel() : this.success()),
      });
  }

  cancel() {
    this.settingsService.changeMode('settings');
  }
  success() {
    this.settingsService.changeMode('success');
  }
}
