import { SettingsComponent } from 'components/settings/settings.component';
import { SuccessComponent } from 'components/success/success.component';
import { TimerComponent } from 'components/timer/timer.component';

export type Components =
  | typeof SettingsComponent
  | typeof TimerComponent
  | typeof SuccessComponent;
