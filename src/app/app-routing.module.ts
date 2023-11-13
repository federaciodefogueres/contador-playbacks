import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimerPageComponent } from './pages/timer-page/timer-page.component';
import { ConfirmRegistrationComponent } from './components/confirm-registration/confirm-registration.component';
import { TimerFullscreenComponent } from './pages/timer-fullscreen/timer-fullscreen.component';
import { AsociacionesComponent } from './pages/asociaciones/asociaciones.component';
import { SesionesComponent } from './pages/sesiones/sesiones.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'administracion', component: TimerPageComponent, canActivate: [AuthGuard] },
  { path: 'validar', component: ConfirmRegistrationComponent, canActivate: [AuthGuard] },
  { path: 'timer', component: TimerFullscreenComponent },
  { path: 'asociaciones', component: AsociacionesComponent, canActivate: [AuthGuard] },
  { path: 'sesiones', component: SesionesComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: TimerFullscreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
