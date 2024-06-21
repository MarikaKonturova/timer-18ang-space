import { Injectable } from '@angular/core';
import { Mode } from 'models/mode.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private mode$ = new BehaviorSubject<Mode>('settings');
  changeMode(newMode: Mode) {
    this.mode$.next(newMode);
  }
  get mode() {
    return this.mode$.asObservable();
  }
}
