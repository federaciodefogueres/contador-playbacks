import { formatCurrency } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Asociacion, EmailItem, InlineResponse200, Session, SettingsService } from 'src/api';
import { ChoreService } from 'src/app/services/chore.service';
import { TimerService, TimerStatus } from 'src/app/services/timer.service';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.scss']
})
export class ConfirmRegistrationComponent {

  emailStatus = '';
  alertMessage = '';

  calculatedSize = {
    width: 0,
    height: 0,
  }

  entryTimer: TimerStatus = {
    name: 'entryTimer',
    status: false,
    value: ''
  }

  exitTimer: TimerStatus = {
    name: 'exitTimer',
    status: false,
    value: ''
  }
  timers: TimerStatus[] = [];

  session: Session | null = null;

  public registryForm!: FormGroup;

  ngOnInit() {
    this.choreService.sessionSelectedObservable.subscribe((res: Session | null) => {
      if (res !== null) {
        this.session = res;
      }
    })
    this.choreService.asociacionSelectedObservable.subscribe((res: Asociacion | null) => {
      if (res !== null) {
        this.registryForm.controls['email'].setValue(res.email);
      }
    })
  }

  constructor(
    private timerService: TimerService,
    private settingsService: SettingsService,
    private fb: FormBuilder,
    private choreService: ChoreService
  ){
    this.calculatedSize.width = window.innerWidth - 32;
    this.calculatedSize.height = window.innerHeight * 0.3;
    for(let timer of this.timerService.timers) {
      if (timer.name === 'entryTimer') {
        this.entryTimer = timer;
      } else if (timer.name === 'exitTimer') {
        this.exitTimer = timer;
      }
    }
    this.loadForm();
  }

  loadForm() {
    this.registryForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      entryTimer: new FormControl(this.entryTimer.value, Validators.required),
      exitTimer: new FormControl(this.exitTimer.value, Validators.required),
      sign: new FormControl('', Validators.required)
    });
  }

  sendEmail() {
    this.saveCanvas();
    if (this.registryForm.valid) {
      this.emailStatus = 'sending';
      this.alertMessage = `Enviando email a ${this.registryForm.controls['email'].value}`
      let body: EmailItem = {
        subject: 'Envío de resultados FFSJ',
        content: `
          <h1>XXXIII Certamen Artístico Fogueres de Sant Joan</h1>
          <h3>${this.session?.session_title}</h3>
          <p>¡Hola! Este es un coreo automático generado por nuestro asistente virtual. El tiempo registrado por tu asociación han sido los siguientes:</p>
          <div style="display: flex;">
              <h3>Tiempo de entrada ${this.registryForm.controls['entryTimer'].value}</h3>
          </div>
          <div style="display: flex;">
              <h3>Tiempo de salida ${this.registryForm.controls['exitTimer'].value}</h3>
          </div>
  
          <h3>Un responsable de vuestra asociación ha firmado en la aplicación web constatando estar de acuerdo con los tiempos registrados. Aquí tenéis, como archivo adjunto, la firma.</h3>
  
          <h3>Nos vemos en la próxima! :)</h3>
        `,
        destine: this.registryForm.controls['email'].value,
        dataSesion: 'asd',
        sign: this.registryForm.controls['sign'].value
      }
      this.settingsService.sendEmail(body).subscribe((res: InlineResponse200) => {
        if (res.status?.code === '200') {
          this.emailStatus = 'sentOK';
          this.alertMessage = '¡Email enviado!';
        } else {
          this.emailStatus = 'sentKO';
          this.alertMessage = 'No se pudo enviar el email.';
        }
      })
    } else {
      this.emailStatus = 'sentKO';
      this.alertMessage = 'Hay datos que no han sido rellenados. Rellénalos!';
    }
  }

  saveCanvas() {
    var canvas = document.getElementsByTagName('app-signer').item(0)?.children[0] as HTMLCanvasElement
    var dataCanvas = canvas.toDataURL("image/png");
    this.registryForm.controls['sign'].setValue("<img src='" + dataCanvas + "' alt='from canvas'/>");
  }

}
