import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ImageFromTimerPipe } from 'pipes/image-from-timer.pipe';
import { Observable } from 'rxjs';
import { TimerService } from 'services/timer.service';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [NgOptimizedImage, ImageFromTimerPipe, AsyncPipe],
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayComponent {
  seconds$: Observable<number>;
  manTimerImg = 'assets/images/manTimer.png';

  constructor(private timerService: TimerService) {
    this.seconds$ = this.timerService.seconds;
  }
}
