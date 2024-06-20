import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { SpacebgComponent } from './components/spacebg/spacebg.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent, SpacebgComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'timer-18ang-space';
}
