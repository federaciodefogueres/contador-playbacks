import { formatCurrency } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailItem, SettingsService } from 'src/api';
import { TimerService, TimerStatus } from 'src/app/services/timer.service';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.scss']
})
export class ConfirmRegistrationComponent {

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

  public registryForm!: FormGroup;

  constructor(
    private timerService: TimerService,
    private settingsService: SettingsService,
    private fb: FormBuilder,
  ){
    this.calculatedSize.width = window.innerWidth * 0.95;
    this.calculatedSize.height = window.innerHeight * 0.3;
    for(let timer of timerService.timers) {
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
      email: new FormControl('', Validators.required),
      entryTimer: new FormControl(this.entryTimer.value, Validators.required),
      exitTimer: new FormControl(this.exitTimer.value, Validators.required),
      sign: new FormControl('', Validators.required)
    });
  }

  sendEmail() {
    this.saveCanvas();
    let body: EmailItem = {
      subject: 'Envío de resultados FFSJ',
      content: `
        <h1>XXXIII Certamen Artístico Fogueres de Sant Joan</h1>
        <h3>Modalidad Única - Sesión 11 Noviembre 2023 11:00h</h3>
        <p>¡Hola! Este es un coreo automático generado por nuestro asistente virtual. El tiempo registrado por tu asociación han sido los siguientes:</p>
        <div style="display: flex;">
            <h3>Tiempo de entrada ${this.registryForm.controls['entryTimer'].value}</h3>
        </div>
        <div style="display: flex;">
            <h3>Tiempo de salida ${this.registryForm.controls['exitTimer'].value}</h3>
        </div>

        <h3>Un responsable de vuestra asociación ha firmado en la aplicación web constatando estar de acuerdo con los tiempos registrados. Aquí tenéis la firma.</h3>
        <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYkAAAEMCAYAAAAxoErWAAAAAXNSR0IArs4c6QAAFPBJREFUeF7t3VvIfWldB/CvHUzBzFJiAsFEww4UXhQRjIwWhEIEkpHRRYpdeJdWFJGUYieKYryILorUKw8dmIgao4NOeRNDpQRqilQiJGQ1kYahafxm9h73bPd+3732/9lrr/U8nw1/nPnPXs/h81u+33etZx0eFx8CBAgQIHBE4HFkCBAgQIDAMQEhYd8gQIAAgaMCQsLOQYAAAQJCwj5AgAABAtMFHElMN7MFAQIEhhEQEsOU2kQJECAwXUBITDezBQECBIYREBLDlNpECRAgMF1ASEw3swUBAgSGERASw5TaRAkQIDBdQEhMN7MFAQIEhhEQEsOU2kQJECAwXUBITDezBQECBIYREBLDlNpECRAgMF1ASEw3swUBAgSGERASw5TaRAkQIDBdQEhMN7MFAQIEhhEQEsOU2kQJECAwXUBITDezBQECBIYREBLDlNpECRAgMF1ASEw3swUBAgSGERASw5TaRAkQIDBdQEhMN7MFAQIEhhEQEsOU2kQJECAwXUBITDezBQECBIYREBLDlNpECRAgMF1ASEw3swUBAgSGERASw5TaRAkQIDBdQEhMN7MFAQIEhhEQEsOU2kQJECAwXUBITDezBQECBIYREBLDlNpECRAgMF1ASEw3swUBAgSGERASw5TaRAkQIDBdQEhMN7MFAQIEhhEQEsOU2kQJECAwXUBITDezBQECBIYREBLDlNpECRAgMF1ASEw3swUBAgSGERASw5TaRAkQIDBdQEhMN7MFAQIEhhEQEsOU2kQJECAwXUBITDezBQECBIYREBLDlNpECRAgMF1ASEw3swUBAgSGERASw5TaRAkQIDBdQEhMN7MFAQIEhhEQEsOU2kQJECAwXUBITDezBQECBIYREBLDlNpECRAgMF1ASEw3swUBAgSGERASw5TaRAkQIDBdQEhMN7MFAQIEhhEQEsOU2kQJECAwXUBITDezBQECBIYREBLDlNpECRAgMF1ASEw3swUBAgSGERASw5TaRAkQIDBdQEhMN7MFAQIEhhEQEsOU2kQJECAwXUBITDezBQECBIYREBLDlNpECRAgMF1ASEw3swUBAgSGERASw5TaRAkQIDBdQEhMN7MFAQIEhhEQEsOU2kQJECAwXUBI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' alt='from canvas'/>

        <h3>Nos vemos en la próxima! :)</h3>
      `,
      destine: this.registryForm.controls['email'].value
    }
    this.settingsService.sendEmail(body).subscribe(res => {
      console.log(res)
    })
  }

  saveCanvas() {
    var canvas = document.getElementsByTagName('app-signer').item(0)?.children[0] as HTMLCanvasElement
    var dataCanvas = canvas.toDataURL("image/png");
    this.registryForm.controls['sign'].setValue("<img src='" + dataCanvas + "' alt='from canvas'/>");
  }

}
