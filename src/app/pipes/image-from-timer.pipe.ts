import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageFromTimer',
  standalone: true,
})
export class ImageFromTimerPipe implements PipeTransform {
  transform(seconds: number, baseImagePath: string): string {
    const path = baseImagePath.replace(/\d+/g, '');
    const imageNumber = seconds >= 80 * 60 ? 80 : seconds >= 40 * 60 ? 40 : '';
    return path.replace(/(\.\w+)$/, `${imageNumber}$1`);
  }
}
