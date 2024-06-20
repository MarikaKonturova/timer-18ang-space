import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

import { TimerService } from 'services/timer.service';
import { SettingsService } from 'services/settings.service';
import { SecondsToMinSecPipe } from 'pipes/seconds-to-min-sec.pipe';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [SecondsToMinSecPipe],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  seconds = 0;
  cdr = inject(ChangeDetectorRef);

  constructor(
    private settingsService: SettingsService,
    private timerService: TimerService
  ) {
    this.timerService.getSeconds
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
        map(() => this.seconds--)
      )
      .subscribe((seconds) => {
        this.cdr.markForCheck();
        if (seconds === 0) {
          this.success();
        }
      });
  }

  cancel() {
    this.settingsService.changeMode('settings');
  }
  success() {
    this.settingsService.changeMode('success');
  }
}
