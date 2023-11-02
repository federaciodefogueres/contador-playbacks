import { Component, EventEmitter, Output } from '@angular/core';
import { TimerService, TimerStatus } from 'src/app/services/timer.service';

@Component({
  selector: 'app-timer-page',
  templateUrl: './timer-page.component.html',
  styleUrls: ['./timer-page.component.scss']
})
export class TimerPageComponent {

  entryTimerStatus: TimerStatus = {
    name: '',
    status: false
  }

  exitTimerStatus: TimerStatus = {
    name: '',
    status: false
  }

  constructor(
    private timerService: TimerService
    ) {
      
    }

  changeEntryTimer(timerStatus: TimerStatus) {
    this.entryTimerStatus = timerStatus;
    this.timerService.startTimer.next(timerStatus);
  }

  changeExitTimer(timerStatus: TimerStatus) {
    this.exitTimerStatus = timerStatus;
    this.timerService.startTimer.next(timerStatus);
  }

}
