import { Component } from '@angular/core';
import { TimerService, TimerStatus } from 'src/app/services/timer.service';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.scss']
})
export class ConfirmRegistrationComponent {

  entryTimer: TimerStatus = {
    name: 'entryTimer',
    status: false,
    value: ''
  }

  exitTimer: TimerStatus = {
    name: 'exitTimer',
    status: false,
    value: ''
  }
  timers: TimerStatus[] = [];

  constructor(
    private timerService: TimerService
  ){
    timerService.timers.forEach(timer => {
      if (timer.name === 'entryTimer') {
        this.entryTimer = timer;
      } else if (timer.name === 'exitTimer') {
        this.exitTimer = timer;
      }
    })
  }

}
