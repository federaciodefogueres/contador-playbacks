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
  sessionsReady: boolean = false;
  asociacionesReady: boolean = false;

  sessions: Session[] = [];
  asociaciones: Asociacion[] = [];
  selectedSession: Session | null = null;
  selectedAsociacion: Asociacion | null = null;

  selectedAsociacionId: string = '';
  selectedSessionId: string = '';

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    if (this.isAsociacion()) {
      this.selectedAsociacionId = localStorage.getItem('asociacion')!;
      this.loadDataAsociaciones();
    } else if (this.isSession()) {
      this.selectedSessionId = localStorage.getItem('session')!;
      this.loadDataSessions();
    }
  }

  loadDataAsociaciones() {
    this.choreService.sessionSelectedObservable.subscribe((res: Session | null) => {
      if (res !== null) {
        this.choreService.setAsociacionSelected(this.selectedAsociacion);
        this.sessionsService.getSession(res.id!).subscribe(sessionData => {
          this.asociaciones = sessionData.session?.participants!;
        })
        let foundAsociacion = this.asociaciones.find(asociacion => asociacion.id === this.selectedAsociacionId);
        if(!Boolean(foundAsociacion)) {
          this.selectedAsociacion = null;
        }
        this.loading = false;
        this.asociacionesReady = true;
      }
    })
    this.asociacionsService.getAllAsociaciones().subscribe((res: AsociacionesResponse) => {
      if (res.status?.code === '200') {
        this.asociaciones = res.participants!;
        if(Boolean(this.selectedAsociacionId)) {
          this.selectedAsociacion = this.asociaciones.find(asociacion => asociacion.id === this.selectedAsociacionId)!;
          this.choreService.setAsociacionSelected(this.selectedAsociacion);
          this.asociacionesReady = true;
          this.loading = false;
        }
      }
    })
  }

  loadDataSessions() {
    this.sessionsService.getAllSessions().subscribe((res: SessionsResponse) => {
      if (res.status?.code === '200') {
        this.sessions = res.sessions!;
        if(Boolean(this.selectedSessionId)) {
          this.selectedSession = this.sessions.find(sesion => sesion.id === this.selectedSessionId)!;
          this.choreService.setSessionSelected(this.selectedSession);
        }
        this.loading = false;
        this.sessionsReady = true;
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
