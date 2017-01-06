import { AuthService } from './../../app/auth.service';
import { Component } from '@angular/core';
import { Nav, Events } from 'ionic-angular';


/*
  Generated class for the LoginProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public events: Events, public auth: AuthService, public nav: Nav) { }

  public logout() {
    this.auth.logout()
    this.events.subscribe('logout', (component) => {
      this.nav.setRoot(component);
    });
  }

}

