import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  timerId = 0;
  seconds = 0;
  mode: 'settings' | 'timer' | 'success' = 'settings';
  constructor() { }

  //put request for success / failure
  //get request to show all data from sessions
}
