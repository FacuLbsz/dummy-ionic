import { MySummoners } from './../providers/my-summoners';
import { MySummonerListPage } from './../pages/my-summoner-list/my-summoner-list';
import { MyOpGGImp } from './../providers/my-op-gg-imp';
import { AuthService } from './../providers/auth/auth.service';
import { LoginPage } from './../pages/login/login';
import { ProfilePage } from './../pages/profile/profile';
import { ExpensesService } from './../providers/expenses-service';
import { NotePage } from './../pages/note/note';
import { CardDetailPage } from './../pages/card-detail/card-detail';
import { DumyVideosPage } from './../pages/dumy-videos/dumy-videos';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { ExpensesForm } from '../pages/expenses/expenses';
import { ExpensesDetailsPage } from '../pages/expenses-detail/expenses-detail';
import { DetailForm } from '../pages/detail-form/detail-form';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';


let storage: Storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{ 'Accept': 'application/json' }],
    tokenGetter: (() => storage.get('id_token'))
  }), http);
}

export const firebaseConfig = {
  apiKey: "AIzaSyDUKZyGSEVpEdcLG2ntIJC6LXJI7IHbB-M",
  authDomain: "proyecto-dummy-312017.firebaseapp.com",
  databaseURL: "https://proyecto-dummy-312017.firebaseio.com",
  storageBucket: "proyecto-dummy-312017.appspot.com",
  messagingSenderId: "940437092764"
};

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    ExpensesForm,
    ExpensesDetailsPage,
    DetailForm,
    DumyVideosPage,
    CardDetailPage,
    NotePage,
    ProfilePage,
    LoginPage,
    MySummonerListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    ExpensesForm,
    ExpensesDetailsPage,
    DetailForm,
    DumyVideosPage,
    CardDetailPage,
    NotePage,
    ProfilePage,
    LoginPage,
    MySummonerListPage
  ],
  providers: [ExpensesService, MyOpGGImp, MySummoners, AuthService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }]
})
export class AppModule { }
