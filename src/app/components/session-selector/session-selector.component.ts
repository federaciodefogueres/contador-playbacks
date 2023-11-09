import { Component } from '@angular/core';
import { SesionesService, Session, SessionsResponse } from 'src/api';

@Component({
  selector: 'app-session-selector',
  templateUrl: './session-selector.component.html',
  styleUrls: ['./session-selector.component.scss']
})
export class SessionSelectorComponent {

  loading: boolean = true;
  sessions: Session[] = [];
  selectedSession: Session | null = null;

  constructor(
    private sesionesService: SesionesService
  ) {
    this.sesionesService.getAllSessions().subscribe((res: SessionsResponse) => {
      if (res.status?.code === '200') {
        this.sessions = res.sessions!;
        this.loading = false;
        console.log(this.sessions)
      }
    })
  }

  onSelectSession(session: Session) {
    this.selectedSession = session;
    console.log(this.selectedSession);
  }

}
