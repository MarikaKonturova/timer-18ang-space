import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { CircleComponent } from 'components/circle/circle.component';
import { DisplayComponent } from 'components/display/display.component';
import { SettingsComponent } from 'components/settings/settings.component';
import { SuccessComponent } from 'components/success/success.component';
import { TimerComponent } from 'components/timer/timer.component';
import { Mode } from 'models/mode.model';
import { SecondsToMinSecPipe } from 'pipes/seconds-to-min-sec.pipe';
import { Observable } from 'rxjs';
import { SettingsService } from 'services/settings.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    TimerComponent,
    SettingsComponent,
    SuccessComponent,
    SecondsToMinSecPipe,
    CommonModule,
    DisplayComponent,
    CircleComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  components: Record<Mode, Type<unknown>> = {
    settings: SettingsComponent,
    timer: TimerComponent,
    success: SuccessComponent,
  };

  mode$: Observable<Mode>;

  constructor(private settingsService: SettingsService) {
    this.mode$ = this.settingsService.mode;
  }
}
