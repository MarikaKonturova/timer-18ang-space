import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { SecondsToMinSecPipe } from '../../pipes/seconds-to-min-sec.pipe';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [SecondsToMinSecPipe],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnInit, OnDestroy {
  constructor(private settingsService: SettingsService) {}

  @Input() timer!: number;
  timerId = 0;
  time = 0;
  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.time = this.timer;
    this.start();
  }
  start() {
    this.timerId = +setInterval(() => {
      if (this.time > 0) {
        this.time--;
      } else {
        this.success();
      }
      this.cdr.markForCheck();
    }, 1000);
  }

  cancel() {
    this.settingsService.changeMode('settings');
  }
  success() {
    this.settingsService.changeMode('success');
  }

  ngOnDestroy() {
    clearInterval(this.timerId);
  }
}
