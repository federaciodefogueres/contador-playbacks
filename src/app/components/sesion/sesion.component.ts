import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { InlineResponse200, SesionesService, Session } from 'src/api';
import { Action } from '../asociacion/asociacion.component';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.scss']
})
export class SesionComponent {

  @Input() session!: Session;
  @Output() onBack: EventEmitter<void> = new EventEmitter();

  public newSessionForm!: FormGroup;
  loading: boolean = true;
  action: Action = 'Crear';

  manageVarticipantesShow: boolean = false;

  ngOnInit() {
    console.log(this.session)
    if (!Boolean(this.session)) {
      console.log('No existe')
      this.session = {
        id: '',
        session_title: '',
        type: 0,
      }
      this.action = 'Crear'
    } else {
      this.action = 'Editar';
    }
    this.loadForm();
  }

  constructor(
    private fb: FormBuilder,
    private sessionService: SesionesService,
  ) {}

  loadForm() {
    this.newSessionForm = this.fb.group({
      id: new FormControl(this.session.id, Validators.required),
      session_title: new FormControl(this.session.session_title, [Validators.required]),
      type: new FormControl(this.session.type, Validators.required),
    });
  }

  processAction() {
    if (this.newSessionForm.valid) {
      let session: Session = {
        id: this.newSessionForm.controls['id'].value,
        session_title: this.newSessionForm.controls['session_title'].value,
        type: parseInt(this.newSessionForm.controls['type'].value),
        type_normalized: '',
        participants: []
      }
      console.log(this.newSessionForm, session);
      if (this.action === 'Crear') {
        this.create(session);
      } else if (this.action === 'Editar') {
        this.update(session);
      }
    } else {
      console.log('Error en el form -> ', this.newSessionForm)
    }
  }

  create(session: Session): void {
    this.sessionService.createSesion(session).subscribe((res: InlineResponse200) => {
      console.log(res)
      if (res.status?.code === '200'){
        this.back();
      } else {
        console.log('Error');
      }
    });
  }

  update(session: Session): void {
    console.log('Update not implemented. -> ', session);
    this.sessionService.putSesion(session.id!, session).subscribe((res: InlineResponse200) => {
      if (res.status?.code === '200'){
        this.back();
      } else {
        console.log('Error');
      }
    })
  }

  delete(id: string): void {
    this.sessionService.deleteSesion(id).subscribe((res: InlineResponse200) => {
      if (res.status?.code === '200'){
        this.back();
      } else {
        console.log('Error');
      }
    })
  }

  manageParticipants() {
    console.log('Manage participants');
    this.manageVarticipantesShow = !this.manageVarticipantesShow;
  }

  back() {
    this.onBack.emit();
  }

}
