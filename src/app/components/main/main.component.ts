import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EmbeddedViewRef,
  OnDestroy,
  inject,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
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
export class MainComponent implements OnDestroy {
  readonly destroy$ = new Subject<void>();

  components: Record<Mode, any> = {
    settings: SettingsComponent,
    timer: TimerComponent,
    success: SuccessComponent,
  };

  cdr = inject(ChangeDetectorRef);
  seconds = 0;
  mode!: Mode;
  embeddedViewRefs: EmbeddedViewRef<
    SettingsComponent | TimerComponent | SuccessComponent
  >[] = [];

  constructor(private settingsService: SettingsService) {
    this.settingsService.getMode
      .pipe(takeUntil(this.destroy$))
      .subscribe((mode) => {
        this.mode = mode;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
