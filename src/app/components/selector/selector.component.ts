import { Component, Input } from '@angular/core';
import { Session, SesionesService, SessionsResponse, AsociacionesService, AsociacionesResponse, Asociacion } from 'src/api';
import { ChoreService } from 'src/app/services/chore.service';

export type TypeSelector = 'session' | 'asociacion';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent {

  @Input() type: TypeSelector = 'session';

  loading: boolean = true;
  sessions: Session[] = [];
  asociaciones: Asociacion[] = [];
  selectedSession: Session | null = null;
  selectedAsociacion: Asociacion | null = null;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    if (this.isAsociacion()) {
      this.loadDataAsociaciones();
    } else if (this.isSession()) {
      this.loadDataSessions();
    }
  }

  loadDataAsociaciones() {
    this.choreService.sessionSelectedObservable.subscribe((res: Session | null) => {
      if (res !== null) {
        this.selectedAsociacion = null;
        this.choreService.setAsociacionSelected(this.selectedAsociacion);
        this.sessionsService.getSession(res.id!).subscribe(sessionData => {
          this.asociaciones = sessionData.session?.participants!;
        })
        this.loading = false;
      }
    })
    this.asociacionsService.getAllAsociaciones().subscribe((res: AsociacionesResponse) => {
      if (res.status?.code === '200') {
        this.asociaciones = res.participants!;
      }
    })
  }

  loadDataSessions() {
    this.sessionsService.getAllSessions().subscribe((res: SessionsResponse) => {
      if (res.status?.code === '200') {
        this.sessions = res.sessions!;
        this.loading = false;
        console.log(this.sessions)
      }
    })
  }
  
  constructor(
    private sessionsService: SesionesService,
    private asociacionsService: AsociacionesService,
    private choreService: ChoreService
  ) { }

  isAsociacion(): boolean{
    return this.type === 'asociacion';
  }

  isSession(): boolean{
    return this.type === 'session';
  }

  onSelect(item: Session | Asociacion) {
    if (this.isAsociacion()){
      this.selectedAsociacion = item;
      this.choreService.setAsociacionSelected(this.selectedAsociacion);
    } else if (this.isSession()) {
      this.selectedSession = item;
      this.choreService.setSessionSelected(this.selectedSession);
    }
  }
}
