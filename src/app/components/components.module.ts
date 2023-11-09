import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer/timer.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { SignerComponent } from './signer/signer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SessionSelectorComponent } from './session-selector/session-selector.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    TimerComponent,
    ConfirmRegistrationComponent,
    SignerComponent,
    SessionSelectorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDropdownModule
  ],
  exports: [
    TimerComponent,
    SessionSelectorComponent
  ]
})
export class ComponentsModule { }
