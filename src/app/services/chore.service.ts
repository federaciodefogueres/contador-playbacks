import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Asociacion, Session } from 'src/api';

@Injectable({
  providedIn: 'root'
})
export class ChoreService {

  private sessionSelected$ = new BehaviorSubject<Session | null>(null);
  sessionSelectedObservable = this.sessionSelected$.asObservable();

  private asociacionselected$ = new BehaviorSubject<Asociacion | null>(null);
  asociacionSelectedObservable = this.asociacionselected$.asObservable();

  private asociacionesArray: Asociacion[] =  [];
  private asociacionesSelecteds$ = new BehaviorSubject<Asociacion[]>([]);
  asociacionesSelectedsObservable = this.asociacionesSelecteds$.asObservable();

  constructor() { }

  setSessionSelected(session: Session | null) {
    this.sessionSelected$.next(session);
  }

  setAsociacionSelected(asociacion: Asociacion | null) {
    this.asociacionselected$.next(asociacion);
  }

  setAsociacionesSelected(asociacion: Asociacion) {
    const index = this.asociacionesArray.indexOf(asociacion);
    if (index === -1) {
      this.asociacionesArray.push(asociacion);
    } else {
      this.asociacionesArray.splice(index, 1);
    }
    console.log(this.asociacionesArray)
    this.asociacionesSelecteds$.next(this.asociacionesArray);
  }

}
