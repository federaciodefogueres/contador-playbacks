import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Asociacion, AsociacionesResponse, AsociacionesService, InlineResponse200 } from 'src/api';

export type Action = 'Crear' | 'Editar';

@Component({
  selector: 'app-asociacion',
  templateUrl: './asociacion.component.html',
  styleUrls: ['./asociacion.component.scss']
})
export class AsociacionComponent {

  @Input() association!: Asociacion;
  @Output() onBack: EventEmitter<void> = new EventEmitter();

  public newAssociationForm!: FormGroup;
  loading: boolean = true;
  action: Action = 'Crear';

  ngOnInit() {
    if (!Boolean(this.association)) {
      console.log('No existe')
      this.association = {
        id: '',
        title: '',
        email: ''
      }
      this.action = 'Crear'
    } else {
      this.action = 'Editar';
    }
    this.loadForm();
  }

  constructor(
    private fb: FormBuilder,
    private associationService: AsociacionesService,
    private router: Router
  ) {}

  loadForm() {
    this.newAssociationForm = this.fb.group({
      id: new FormControl(this.association.id, Validators.required),
      email: new FormControl(this.association.email, [Validators.required, Validators.email]),
      title: new FormControl(this.association.title, Validators.required),
    });
    this.loading = false;
  }

  processAction() {
    if (this.newAssociationForm.valid) {
      let association: Asociacion = {
        id: this.newAssociationForm.controls['id'].value,
        email: this.newAssociationForm.controls['email'].value,
        title: this.newAssociationForm.controls['title'].value
      }
      console.log(this.newAssociationForm, association);
      if (this.action === 'Crear') {
        this.createAssociation(association);
      } else if (this.action === 'Editar') {
        this.updateAssociation(association);
      }
    } else {
      console.log('Error en el form -> ', this.newAssociationForm)
    }
  }

  createAssociation(association: Asociacion): void {
    this.associationService.createAsociacion(association).subscribe((res: InlineResponse200) => {
      console.log(res)
      if (res.status?.code === '200'){
        this.router.navigateByUrl('asociaciones');
      } else {
        console.log('Error');
      }
    });
  }

  updateAssociation(association: Asociacion): void {
    console.log('Update not implemented. -> ', association);
    /*this.associationService.updateAssociation(association).subscribe(() => {
      this.loadAssociations();
    });*/
  }

  deleteAssociation(id: string): void {
    console.log('Delete not implemented. -> ', id);
    /*this.associationService.deleteAssociation(id).subscribe(() => {
      this.loadAssociations();
    });*/
  }

  back() {
    this.onBack.emit();
  }

}
