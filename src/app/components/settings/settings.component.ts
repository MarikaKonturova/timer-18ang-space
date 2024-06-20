import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsService } from 'services/settings.service';
import { TimerService } from 'services/timer.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  minutes = 0;
  error = false;

  constructor(
    private settingsService: SettingsService,
    private timerService: TimerService
  ) {}

  onInputChange() {
    if (this.minutes > 0) {
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
}
