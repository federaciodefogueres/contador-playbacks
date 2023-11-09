import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { TimerFullscreenComponent } from './timer-fullscreen/timer-fullscreen.component';



@NgModule({
  declarations: [
    TimerFullscreenComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ]
})
export class PagesModule { }
