import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Mode } from '../../models/mode.model';
import { SecondsToMinSecPipe } from '../../pipes/seconds-to-min-sec.pipe';
import { SettingsService } from '../../services/settings.service';
import { SettingsComponent } from '../settings/settings.component';
import { SuccessComponent } from '../success/success.component';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    TimerComponent,
    SettingsComponent,
    SuccessComponent,
    SecondsToMinSecPipe,
    CommonModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  components: Record<Mode, any> = {
    settings: SettingsComponent,
    timer: TimerComponent,
    success: SuccessComponent,
  };

  cdr = inject(ChangeDetectorRef);
  seconds = 0;
  mode!: Mode;

  constructor(private settingsService: SettingsService) {
    this.settingsService.getMode
      .pipe(takeUntilDestroyed())
      .subscribe((mode) => {
        this.mode = mode;
        this.cdr.markForCheck();
      });
  }
}
