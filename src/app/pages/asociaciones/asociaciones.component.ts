import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Asociacion, AsociacionesResponse, AsociacionesService } from 'src/api';

export type ViewFormat = 'list' | 'component';

@Component({
  selector: 'app-asociaciones',
  templateUrl: './asociaciones.component.html',
  styleUrls: ['./asociaciones.component.scss']
})
export class AsociacionesComponent {

  associations: Asociacion[] = [];
  @Input() view: ViewFormat = 'list';
  loading: boolean = true;

  asociacionSelected: Asociacion | null = null;

  constructor(
    private associationService: AsociacionesService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    let appSelector = document.querySelector('app-selector');
    appSelector?.remove();
    this.loadAssociations();
  }

  loadAssociations(): void {
    this.associationService.getAllAsociaciones().subscribe((associations: AsociacionesResponse) => {
      this.associations = associations.participants!;
      this.loading = false;
    });
  }

  changeView(association?: Asociacion) {
    if (this.view === 'component') {
      this.loadAssociations();
      this.view = 'list';
    } else if (this.view === 'list') {
      this.viewAssociation(association!)
      this.view = 'component'
    }
  }

  viewAssociation(association: Asociacion): void {
    this.asociacionSelected = association;
  }

}
