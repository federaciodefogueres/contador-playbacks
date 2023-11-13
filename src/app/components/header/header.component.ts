import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { clippingParents } from '@popperjs/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  showSelectors: boolean = false;
  titleHeader: string = '';

  constructor(
    public router: Router,
    public authService: AuthService,
  ) {
    this.router.events.subscribe(() => {
      if (this.router.url === '/administracion' || this.router.url === '/validar') {
        this.showSelectors = true;
      } else {
        this.showSelectors = false;
        this.titleHeader = this.router.url.split('/')[1].toUpperCase();
      }
    })
  }

  openNav() {
    document.getElementById("mySidenav")!.style.width = "250px";
  }
  
  closeNav() {
    document.getElementById("mySidenav")!.style.width = "0";
  }

}
