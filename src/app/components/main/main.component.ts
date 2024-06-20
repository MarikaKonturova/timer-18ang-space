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
import { SpacebgComponent } from '../spacebg/spacebg.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    TimerComponent,
    SettingsComponent,
    SuccessComponent,
    SecondsToMinSecPipe,
    SpacebgComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',

  //?? do we really need changeDet.onPush for the main component? i think we don't, but we will see
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnDestroy, OnInit {
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
  mode: 'settings' | 'timer' | 'success' = 'settings';
  embeddedViewRefs: EmbeddedViewRef<any>[] = [];
  ngOnInit(): void {
    this.renderDyanmicTemplates();
  }

  private getTemplateRefs() {
    console.log(this.mode);
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
    const embeddedViewRef = this.containerRef.createEmbeddedView(templateRef);
    this.embeddedViewRefs.push(embeddedViewRef);
    this.cdr.detectChanges();
  }

  start(minutes: number) {
    this.seconds = minutes * 60;
    this.mode = 'timer';
    this.renderDyanmicTemplates();
  }

  //fail and success session
  changeMode(mode: 'settings' | 'timer' | 'success') {
    this.mode = mode;
    this.renderDyanmicTemplates();
  }
  ngOnDestroy() {
    // destroy embeddedViewRefs to avoid memory leak
    for (const viewRef of this.embeddedViewRefs) {
      if (viewRef) {
        viewRef.destroy();
      }
    }
  }
}
