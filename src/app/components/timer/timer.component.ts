import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { Subject, interval, map, takeUntil } from 'rxjs';
import { SecondsToMinSecPipe } from '../../pipes/seconds-to-min-sec.pipe';
import { SettingsService } from '../../services/settings.service';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [SecondsToMinSecPipe],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnInit, OnDestroy {
  readonly destroy$ = new Subject<void>();
  seconds = 0;
  cdr = inject(ChangeDetectorRef);

  constructor(
    private settingsService: SettingsService,
    private timerService: TimerService
  ) {
    this.timerService.getSeconds
      .pipe(takeUntil(this.destroy$))
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
        takeUntil(this.destroy$),
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
