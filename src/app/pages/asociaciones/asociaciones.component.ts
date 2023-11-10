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
  public newAssociationForm!: FormGroup;
  @Input() view: ViewFormat = 'list';

  asociacionSelected: Asociacion | null = null;

  constructor(
    private associationService: AsociacionesService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.loadForm();
    this.loadAssociations();
  }

  loadForm() {
    this.newAssociationForm = this.fb.group({
      id: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      title: new FormControl('', Validators.required),
    });
  }

  loadAssociations(): void {
    this.associationService.getAllAsociaciones().subscribe((associations: AsociacionesResponse) => {
      this.associations = associations.participants!;
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

  createAssociation(): void {
    let association: Asociacion = {
      id: this.newAssociationForm.controls['id'].value,
      email: this.newAssociationForm.controls['email'].value,
      title: this.newAssociationForm.controls['title'].value
    }
    console.log(this.newAssociationForm, association);
    this.associationService.createAsociacion(association).subscribe(() => {
      this.loadAssociations();
    });
  }

}
