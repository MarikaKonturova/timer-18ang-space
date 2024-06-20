import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EmbeddedViewRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { SettingsComponent } from '../settings/settings.component';
import { TimerComponent } from '../timer/timer.component';
import { SuccessComponent } from '../success/success.component';
import { SecondsToMinSecPipe } from '../../pipes/seconds-to-min-sec.pipe';
import { SettingsService } from '../../services/settings.service';
import { Mode } from '../../models/mode.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    TimerComponent,
    SettingsComponent,
    SuccessComponent,
    SecondsToMinSecPipe,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnDestroy, OnInit {
  readonly destroy$ = new Subject<void>();
  @ViewChild('cont', { static: true, read: ViewContainerRef })
  containerRef!: ViewContainerRef;
  @ViewChild('settings', { static: true, read: TemplateRef })
  settingsRef!: TemplateRef<SettingsComponent>;
  @ViewChild('timer', { static: true, read: TemplateRef })
  timerRef!: TemplateRef<TimerComponent>;
  @ViewChild('success', { static: true, read: TemplateRef })
  successRef!: TemplateRef<SuccessComponent>;
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
        this.renderDyanmicTemplates();
      });
  }

  ngOnInit(): void {
    this.renderDyanmicTemplates();
  }

  private getTemplateRefs() {
    if (this.mode === 'success') {
      return this.successRef;
    } else if (this.mode === 'timer') {
      return this.timerRef;
    }
    return this.settingsRef;
  }

  renderDyanmicTemplates() {
    const templateRef = this.getTemplateRefs();

    this.containerRef.clear();
    const embeddedViewRef = this.containerRef.createEmbeddedView<
      SettingsComponent | TimerComponent | SuccessComponent
    >(templateRef);
    this.embeddedViewRefs.push(embeddedViewRef);
    this.cdr.detectChanges();
  }

  changeTime(minutes: number) {
    this.seconds = minutes * 60;
  }

  //TODO delete
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    for (const viewRef of this.embeddedViewRefs) {
      if (viewRef) {
        viewRef.destroy();
      }
    }
  }
}
