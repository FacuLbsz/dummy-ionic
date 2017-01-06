import { AuthService } from './../../app/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public auth: AuthService) { }

    loadingAuth() {
    return this.auth.loading;
  }

}
