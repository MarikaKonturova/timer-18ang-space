import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  template: `
    <p>congratulations! you did something, isn't that cool!</p>
    <button (click)="backToMain()">Got it!</button>
  `,
  styleUrl: './success.component.scss',
})
export class SuccessComponent {
  @Output() modeChange = new EventEmitter<'settings' | 'timer' | 'success'>();
  backToMain() {
    this.modeChange.emit('settings');
  }
}
