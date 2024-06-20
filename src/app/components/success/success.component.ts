import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  template: `
    <p>congratulations! you did something, isn't that cool!</p>
    <button (click)="backToMain()">Got it!</button>
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
