import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { SettingsService } from 'services/settings.service';
import { TimerService } from 'services/timer.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  minutes!: number;
  error = false;
  cdr = inject(ChangeDetectorRef);
  constructor(
    private settingsService: SettingsService,
    private timerService: TimerService
  ) {
    this.timerService.seconds
      .pipe(takeUntilDestroyed())
      .subscribe((seconds) => {
        if (this.minutes === 0 && this.error) {
          this.closeError();
        }
        this.minutes = Math.floor(seconds / 60);
        this.cdr.markForCheck();
      });
  }
  ngOnInit(): void {
    this.timerService.changeSeconds(0);
  }

  start() {
    if (this.minutes === 0 && !this.error) {
      this.error = true;
    } else {
      this.settingsService.changeMode('timer');
    }
  }

  closeError() {
    this.error = false;
  }
}
