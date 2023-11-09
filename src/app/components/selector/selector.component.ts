import { Component, Input } from '@angular/core';
import { Session, SesionesService, SessionsResponse, AsociacionesService, AsociacionesResponse, Asociacion } from 'src/api';

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
    this.asociacionsService.getAllAsociaciones().subscribe((res: AsociacionesResponse) => {
      if (res.status?.code === '200') {
        this.asociaciones = res.participants!;
        this.loading = false;
        console.log(this.asociaciones)
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
    } else if (this.isSession()) {
      this.selectedSession = item;
    }
  }
}
