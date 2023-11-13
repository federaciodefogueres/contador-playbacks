import { Component, Input } from '@angular/core';
import { Subscription, interval, map } from 'rxjs';
import { TimerService, TimerStatus } from 'src/app/services/timer.service';

export interface TimerClockModel {
  minutes: number;
  seconds: number;
}

type TimerColorClass = 'good' | 'warning' | 'danger';
type TimerScreenClass = 'full' | 'component';
type FullScreenClass = 'full-screen' | '' ;
type ContainerClass = 'container' | '' ;
type PaddingClass = 'p-3' | '' ;

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {

  timerColorClass: TimerColorClass = 'good';
  fullScreen: FullScreenClass = 'full-screen';
  containerClass: ContainerClass = 'container';
  paddingClass: PaddingClass = 'p-3';

  @Input() timerType: TimerScreenClass = 'component';

  timerScreenClasses = ['container', 'p-3'];

  timerStatus: TimerStatus = {
    name: '',
    status: false,
    value: ''
  }

  timer: TimerClockModel = {
    minutes: 4,
    seconds: 0,
  };

  loading: boolean = true;

  ngOnInit() {
    if (this.timerType === 'component') {
      this.fullScreen = '';
      this.containerClass = 'container';
      this.paddingClass = 'p-3';
    } else {
      this.fullScreen = 'full-screen';
      this.containerClass = '';
      this.paddingClass = '';
    }
    this.loading = false;
  }

  constructor(
    private timerService: TimerService
  ) {
    this.timerService.timer.valueChanges().subscribe((res: any) => {
      this.timer.minutes = res[0].min;
      this.timer.seconds = res[0].sec;
      this.checkTimerColorClass();
    })
   }
  
  checkTimerColorClass(timer: number = this.timer.minutes) {
    if (timer === 1 ) {
      this.timerColorClass = 'warning';
    } else if (timer === 0) {
      this.timerColorClass = 'danger';
    } else {
      this.timerColorClass = 'good';
    }
  }

}