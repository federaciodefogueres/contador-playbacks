import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface TimerStatus {
  name: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  startTimer: Subject<TimerStatus> = new Subject<TimerStatus>();

  constructor() { }
}
