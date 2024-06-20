import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Mode } from '../models/mode.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private mode = new BehaviorSubject<Mode>('settings');
  changeMode(newMode: Mode) {
    this.mode.next(newMode);
  }
  get getMode() {
    return this.mode.asObservable();
  }
}
