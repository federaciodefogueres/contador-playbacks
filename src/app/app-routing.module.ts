import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimerPageComponent } from './pages/timer-page/timer-page.component';
import { ConfirmRegistrationComponent } from './components/confirm-registration/confirm-registration.component';
import { TimerFullscreenComponent } from './pages/timer-fullscreen/timer-fullscreen.component';

const routes: Routes = [
  {path: '', component: TimerPageComponent},
  {path: 'validar', component: ConfirmRegistrationComponent},
  {path: 'timer', component: TimerFullscreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
