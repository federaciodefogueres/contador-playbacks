import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AsociacionesResponse, SesionesService, SessionsResponse } from 'src/api';
import { Session } from 'src/api/model/session';

export type ViewFormat = 'list' | 'component';

@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.component.html',
  styleUrls: ['./sesiones.component.scss']
})
export class SesionesComponent {

  sessions: Session[] = [];
  @Input() view: ViewFormat = 'list';
  loading: boolean = true;

  sessionSelected: Session | null = null;

  constructor(
    private sessionService: SesionesService,
    ) { }

  ngOnInit(): void {
    this.loadAssociations();
  }

  loadAssociations(): void {
    this.sessionService.getAllSessions().subscribe((sessions: SessionsResponse) => {
      if (sessions.status?.code === '200') {
        this.sessions = sessions.sessions!;
        this.loading = false;
      }
    });
  }

  changeView(session?: Session) {
    if (this.view === 'component') {
      this.loadAssociations();
      this.view = 'list';
    } else if (this.view === 'list') {
      this.viewAssociation(session!)
      this.view = 'component'
    }
  }

  viewAssociation(session: Session): void {
    this.sessionSelected = session;
  }

}
