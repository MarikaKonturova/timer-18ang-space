import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SettingsService } from 'services/settings.service';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  template: `
    <div class="container">
      <p class="text">congratulations! you did something, isn't that cool!</p>
      <button (click)="backToMain()" class="button">Got it!</button>
    </div>
  `,
  styleUrl: './success.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessComponent {
  constructor(private settingsService: SettingsService) {}

  backToMain() {
    this.settingsService.changeMode('settings');
  }
}
