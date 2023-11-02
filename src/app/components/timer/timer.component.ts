import { Component, Input } from '@angular/core';
import { Subscription, interval, map } from 'rxjs';
import { TimerService, TimerStatus } from 'src/app/services/timer.service';

export interface TimerClockModel {
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {

  @Input() timerId = '';
  private timerSubscription: Subscription = new Subscription;

  timer: TimerClockModel = {
    minutes: 4,
    seconds: 0,
  };

  ngOnInit() {
    this.timerSubscription = this.timerService.startTimer.subscribe((timerStatus: TimerStatus)  => {
      this.changeTimerStatus(timerStatus);
    })
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }

  constructor(
    private timerService: TimerService
  ) { }
  
  changeTimerStatus(timerStatus: TimerStatus) {
    if (this.timerId !== timerStatus.name){
      return;
    }
    if (timerStatus.status) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  counterSubscription: Subscription = new Subscription;

  startTimer() {
    this.counterSubscription = interval(1000).subscribe(() => {
      if (this.timer.seconds > 0) {
        this.timer.seconds--;
      } else if (this.timer.minutes > 0) {
        this.timer.minutes--;
        this.timer.seconds = 59;
      } else {
        this.counterSubscription.unsubscribe();
      }
    });
  }

  stopTimer() {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }
  }

}