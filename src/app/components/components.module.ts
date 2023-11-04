import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer/timer.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { SignerComponent } from './signer/signer.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TimerComponent,
    ConfirmRegistrationComponent,
    SignerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    TimerComponent
  ]
})
export class ComponentsModule { }
