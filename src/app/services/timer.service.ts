import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore'

export interface Timer {
  min: number, 
  sec: number
}

export interface TimerStatus {
  name: string;
  status: boolean;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class TimerService {

  timers: TimerStatus[] = [];

  timer!: AngularFirestoreCollection<any>;

  timerObject: Timer = {
    min: 4,
    sec: 0
  }

  firstTime: boolean = true;
  timerStatus: boolean = false;

  constructor(
    private db: AngularFirestore
  ) {
    this.timer = this.db.collection('timer');
  }

  updateContador(timer: Timer = this.timerObject) {
    this.timer.doc('timer').update(timer);
  }

  changeTimer() {
    this.timerStatus = !this.timerStatus;
    if (this.timerStatus) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  startTimer() {
    if (this.firstTime) {
      this.updateContador({min: 4,sec: 0});
    }
    this.timerStatus = true;
    let intervalTimer = setInterval(() => {
      if (this.timerStatus) {
        if (this.timerObject.sec > 0) {
          this.timerObject.sec--;
        } else {
          this.timerObject.min--;
          this.timerObject.sec = 59;
        }
        this.updateContador()
      } else {
        clearInterval(intervalTimer);
      }
    }, 1000)
  }

  resetTimer() {
    this.timerObject.min = 4;
    this.timerObject.sec = 0;
    this.updateContador()
  }

  stopTimer() {
    this.timerStatus = false;
    this.firstTime = false;
  }

  saveTimer(name: string) {
    console.log('Saving Timer -> ', name);
    
    let timerStatus: TimerStatus = {
      name: name,
      status: false,
      value: `${this.timerObject.min}:${this.timerObject.sec}`
    }
    let timerFound = this.timers.find(timer => timer.name === name);
    if (Boolean(timerFound)) {
      timerFound = timerStatus;
    } else {
      this.timers.push(timerStatus)
    }
    console.log(timerFound);
    console.log(this.timers);
    
  }
  
}
