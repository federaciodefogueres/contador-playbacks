import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Asociacion, Session } from 'src/api';

@Injectable({
  providedIn: 'root'
})
export class ChoreService {

  private sessionSelected$ = new BehaviorSubject<Session | null>(null);
  sessionSelectedObservable = this.sessionSelected$.asObservable();

  private asociacionelected$ = new BehaviorSubject<Asociacion | null>(null);
  asociacionSelectedObservable = this.asociacionelected$.asObservable();

  constructor() { }

  setSessionSelected(session: Session | null) {
    this.sessionSelected$.next(session);
  }

  setAsociacionSelected(asociacion: Asociacion | null) {
    this.asociacionelected$.next(asociacion);
  }

}
