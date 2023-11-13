import { Component } from '@angular/core';

@Component({
  selector: 'app-timer-fullscreen',
  templateUrl: './timer-fullscreen.component.html',
  styleUrls: ['./timer-fullscreen.component.scss']
})
export class TimerFullscreenComponent {
  loading: boolean = true;

  ngOnInit() {
    let appHeader = document.querySelector('app-header');
    appHeader?.remove();
    this.loading = false;
  }

}
