import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CircleComponent } from 'components/circle/circle.component';
import { DisplayComponent } from 'components/display/display.component';

@Component({
  selector: 'app-slider-wrapper',
  standalone: true,
  imports: [DisplayComponent, CircleComponent],
  templateUrl: './slider-wrapper.component.html',
  styleUrl: './slider-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderWrapperComponent {
  imageIndex = 0;
  imageArray = ['manTimer.png'];

  rightClick() {
    if (this.imageIndex === this.imageArray.length - 1) {
      this.imageIndex = 0;
    } else {
      this.imageIndex++;
    }
  }
  leftClick() {
    if (this.imageIndex === 0) {
      this.imageIndex = this.imageArray.length - 1;
    } else {
      this.imageIndex--;
    }
  }
  //this could be pipe
  imageToDisplay() {
    return `assets/images/${this.imageArray[this.imageIndex]}`;
  }
}
