import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer/timer.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { SignerComponent } from './signer/signer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SessionSelectorComponent } from './session-selector/session-selector.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    TimerComponent,
    ConfirmRegistrationComponent,
    SignerComponent,
    SessionSelectorComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BsDropdownModule
  ],
  exports: [
    TimerComponent,
    SessionSelectorComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
