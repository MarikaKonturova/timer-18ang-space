import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToMinSec',
  standalone: true,
})
export class SecondsToMinSecPipe implements PipeTransform {
  transform(totalSeconds: number): string {
    const minutes: number = Math.floor(totalSeconds / 60);
    const seconds: number = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
