import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer/timer.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { SignerComponent } from './signer/signer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HeaderComponent } from './header/header.component';
import { SelectorComponent } from './selector/selector.component';
import { AsociacionComponent } from './asociacion/asociacion.component';
import { SharedModule } from '../shared.module';
import { SesionComponent } from './sesion/sesion.component';
import { ParticipantesComponent } from './participantes/participantes.component';

@NgModule({
  declarations: [
    TimerComponent,
    ConfirmRegistrationComponent,
    SignerComponent,
    HeaderComponent,
    SelectorComponent,
    AsociacionComponent,
    SesionComponent,
    ParticipantesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDropdownModule,
    SharedModule
  ],
  exports: [
    TimerComponent,
    HeaderComponent,
    AsociacionComponent,
    SesionComponent
  ]
})
export class ComponentsModule { }
