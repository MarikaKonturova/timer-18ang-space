import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsService } from 'services/settings.service';
import { TimerService } from 'services/timer.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  minutes = 0;
  error = false;

  constructor(
    private settingsService: SettingsService,
    private timerService: TimerService
  ) {}

  ngOnInit(): void {
    this.timerService.changeSeconds(0);
  }
  onInputChange() {
    if (this.error && this.minutes > 0) {
      this.error = false;
    }
    //can we do it so much time or there is another solution?
    this.timerService.changeSeconds(this.minutes * 60);
  }
  start() {
    if (this.minutes === 0) {
      this.error = true;
    } else {
      this.settingsService.changeMode('timer');
    }
  }

  closeError() {
    this.error = false;
  }
}
