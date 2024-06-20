import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private seconds = new BehaviorSubject<number>(0);

  changeSeconds(seconds: number) {
    this.seconds.next(seconds);
  }

  get getSeconds(): Observable<number> {
    return this.seconds.asObservable();
  }
}
