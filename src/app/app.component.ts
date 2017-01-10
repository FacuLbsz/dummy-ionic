import { MyOpGGImp } from './../providers/my-op-gg-imp';
import { AuthService } from './../providers/auth/auth.service';
import { ProfilePage } from './../pages/profile/profile';
import { DumyVideosPage } from './../pages/dumy-videos/dumy-videos';
import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from 'ionic-native';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';
import { ExpensesForm } from '../pages/expenses/expenses';

import { Events } from 'ionic-angular';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{ title: string, component: any }>;

  loading: boolean = true;

  constructor(
    public events: Events,
    public platform: Platform,
    public menu: MenuController,
    public auth: AuthService,
    public opgg : MyOpGGImp
  ) {
    this.initializeApp();
    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage },
      { title: 'Gastos', component: ExpensesForm },
      { title: 'Cards', component: DumyVideosPage },
      { title: 'Perfil', component: ProfilePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.overlaysWebView(true);
      StatusBar.backgroundColorByName('red');
      //StatusBar.styleDefault();
      this.auth.startupTokenRefresh();
    });
    this.events.publish('logout', MyApp);
  }

  loadingAuth() {
    return this.auth.loading;
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

}
