import { Component } from '@angular/core';
import { Asociacion, AsociacionesResponse, AsociacionesService } from 'src/api';
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

  asociaciones: Asociacion[] = [];
  asociacionesShow: AsociacionCheck[] = [];

  constructor(
    private asociacionesService: AsociacionesService,
    private choreService: ChoreService
  ) {}

  ngOnInit() {
    this.loadAsociacionesData();
  }

  loadAsociacionesData() {
    this.asociacionesService.getAllAsociaciones().subscribe((asociaciones: AsociacionesResponse) => {
      if (asociaciones.status?.code === '200') {
        this.asociaciones = asociaciones.participants!;
        asociaciones.participants?.map(asociacion => {
          this.asociacionesShow.push({id: asociacion.id!, title: asociacion.title!, checked: false});
        })
      }
    })
  }

  checkAsociacion(asociacion: AsociacionCheck) {
    asociacion.checked = !asociacion.checked;
    let asociacionFind = this.asociaciones.find(asociacionData => {
      return asociacion.id === asociacionData.id;
    })
    this.choreService.setAsociacionesSelected(asociacionFind!)
  }

}
