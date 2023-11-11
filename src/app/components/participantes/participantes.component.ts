import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Asociacion, AsociacionesResponse, AsociacionesService, SesionesService, Session, SessionResponse } from 'src/api';
import { ChoreService } from 'src/app/services/chore.service';

export interface AsociacionCheck {
  id: string;
  title: string;
  checked: boolean;
}

@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.scss']
})
export class ParticipantesComponent {

  @Output() asociacionChecked: EventEmitter<Asociacion> = new EventEmitter<{}>;

  asociaciones: Asociacion[] = [];
  asociacionesShow: AsociacionCheck[] = [];
  loading: boolean = true;

  @Input() session: Session = {};

  constructor(
    private asociacionesService: AsociacionesService,
    private sessionService: SesionesService,
    private choreService: ChoreService
  ) {}

  ngOnInit() {
    this.loadAsociacionesData();
  }

  loadAsociacionesFromSession() {
    this.choreService.asociacionesSelectedsObservable.subscribe((asociaciones: Asociacion[]) => {
      if (asociaciones.length > 0) {
        this.asociacionesShow.map((asociacionShow: AsociacionCheck) => {
          const index = asociaciones.findIndex(asoc => asoc.id === asociacionShow.id);
          if (index !== -1) {
            asociacionShow.checked = true;
          }
        })
      }
      this.loading = false;
    })
  }

  loadAsociacionesData() {
    this.asociacionesService.getAllAsociaciones().subscribe((asociaciones: AsociacionesResponse) => {
      if (asociaciones.status?.code === '200') {
        this.asociaciones = asociaciones.participants!;
        asociaciones.participants?.map(asociacion => {
          this.asociacionesShow.push({id: asociacion.id!, title: asociacion.title!, checked: false});
        })
        this.loadAsociacionesFromSession();
      }
    })
  }

  checkAsociacion(asociacion: AsociacionCheck) {
    asociacion.checked = !asociacion.checked;
    let asociacionFind = this.asociaciones.find(asociacionData => {
      return asociacion.id === asociacionData.id;
    })
    this.choreService.addAsociacionesSelected(asociacionFind!)
  }

}
