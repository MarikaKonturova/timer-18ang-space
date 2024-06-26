import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  seconds$ = new BehaviorSubject<number>(0);

  changeSeconds(seconds: number) {
    this.seconds$.next(seconds);
  }

  get seconds() {
    return this.seconds$.asObservable();
  }
}
