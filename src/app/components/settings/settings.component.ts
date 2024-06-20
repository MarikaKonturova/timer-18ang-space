import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings.service';

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
  @Output() timeChange = new EventEmitter<number>();

  constructor(private settingsService: SettingsService) {}

  onInputChange() {
    if (this.minutes > 0) {
      this.error = false;
    }
    this.timeChange.emit(this.minutes);
  }
  start() {
    if (this.minutes === 0) {
      this.error = true;
    } else {
      this.settingsService.changeMode('timer');
    }
  }
}
