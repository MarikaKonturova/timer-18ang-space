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
  @Output() timerChange = new EventEmitter<number>();
  onInputChange() {
    if (this.minutes > 0) {
      this.error = false;
    }
  }
  start() {
    if (this.minutes === 0) {
      this.error = true;
    } else {
      this.timerChange.emit(this.minutes);
    }
  }
}
