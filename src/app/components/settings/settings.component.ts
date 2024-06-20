import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  minutes = 0;
  error = false;
  @Output() timeChange = new EventEmitter<number>();
  @Output() modeChange = new EventEmitter<'settings' | 'timer' | 'success'>();

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
      this.modeChange.emit('timer');
    }
  }
}
