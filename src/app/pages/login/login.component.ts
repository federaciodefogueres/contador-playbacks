import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading: boolean = true;

  ngOnInit() {
    let appHeader = document.querySelector('app-header');
    ///appHeader?.remove();
    appHeader?.setAttribute('style', 'display: none')
    this.loading = false;
  }

  email!: string;
  password!: string;

  isLoged: boolean = false;

  constructor(public authService: AuthService) {
    this.isLoged = this.authService.isLoggedIn;
  }

  signIn() {
    this.authService.login(this.email, this.password);
  }

  signOut() {
    this.authService.logout();
  }
}
