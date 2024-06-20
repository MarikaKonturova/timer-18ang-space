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

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [SecondsToMinSecPipe],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',

})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() timer!: number;
  @Output() modeChange = new EventEmitter<'settings' | 'timer' | 'success'>();
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
        this.modeChange.emit('success');
      }
      this.cdr.markForCheck();
    }, 1000);
  }

  cancel() {
    this.modeChange.emit('settings');
  }
  success() {
    this.modeChange.emit('success');
  }

  ngOnDestroy() {
    clearInterval(this.timerId);
  }
}
