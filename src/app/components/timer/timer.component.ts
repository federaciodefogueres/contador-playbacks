import { Component, Input } from '@angular/core';
import { Subscription, interval, map } from 'rxjs';
import { TimerService, TimerStatus } from 'src/app/services/timer.service';

export interface TimerClockModel {
  minutes: number;
  seconds: number;
}

type TimerColorClass = 'good' | 'warning' | 'danger';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {

  timerColorClass: TimerColorClass = 'good';

  @Input() timerId = '';
  private timerSubscription: Subscription = new Subscription;

  timerStatus: TimerStatus = {
    name: '',
    status: false,
    value: ''
  }

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
    this.timerStatus = timerStatus;
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

  checkTimerColorClass(timer: number) {
    console.log(timer)
    if (timer === 1 ) {
      this.timerColorClass = 'warning';
    } else if (timer === 0) {
      this.timerColorClass = 'danger';
    } else {
      this.timerColorClass = 'good';
    }
  }

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
          this.checkTimerColorClass(this.timer.minutes);
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
    let timerData: TimerStatus = this.timerStatus;
    timerData.value = `${this.timer.minutes}:${this.timer.seconds}`;
    //localStorage.setItem(this.timerStatus.name, timerData.value);

    let timer = this.timerService.timers.find(timer => {
      return timer.name === timerData.name;
    });

    if(Boolean(timer)) {
      timer!.value = timerData.value;
    } else {
      this.timerService.timers.push(timerData);
    }

  }

}