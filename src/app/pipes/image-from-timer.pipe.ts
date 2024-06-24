import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageFromTimer',
  standalone: true,
})
export class ImageFromTimerPipe implements PipeTransform {
  transform(seconds: number, baseImagePath: string): string {
    const path = baseImagePath.replace(/\d+/g, '');

    let imageNumber = '';
    if (seconds >= 80 * 60) {
      imageNumber = '80';
    } else if (seconds >= 40 * 60) {
      imageNumber = '40';
    }
    return path.replace(/(\.\w+)$/, `${imageNumber}$1`);
  }
}
