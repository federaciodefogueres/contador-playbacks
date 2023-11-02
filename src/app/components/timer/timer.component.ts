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
      if(this.timer.minutes === 0 && this.timer.seconds === 0) {
        this.timer.minutes = -1;
        this.timer.seconds++;
      }
      if (this.timer.minutes >= 0) {
        if (this.timer.seconds > 0) {
          this.timer.seconds--;
        } else {
          this.timer.minutes--;
          this.timer.seconds = 59;
        } 
      } else {
        if (this.timer.seconds < 59) {
          this.timer.seconds++;
        } else {
          this.timer.seconds = 0;
          this.timer.minutes--;
        }
      }
    });
  }

  stopTimer() {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }
  }

}