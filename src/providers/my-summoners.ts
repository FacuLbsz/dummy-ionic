import { UserForm } from './../pages/form/user/user-form';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { SummonerModel } from './../pages/form/summoner/summoner-model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MySummoners provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MySummoners {

  summonersDb: FirebaseListObservable<any>;
  summonersLoaded: boolean = false;
  user: UserForm;

  constructor(public http: Http, public database: AngularFireDatabase) {
    console.log('Hello MySummoners Provider');
  }

  load(user: UserForm) {
    this.user = user;
    console.log("*****LOAD() USER ", this.user);
    this.summonersDb = this.database.list('/summoners/' + user.user.replace('.', '') + '/');
  }

  exist(region: string, summonerName: string) {
    return new Promise(resolve => {
      let subscription = this.getSummonersByUser()
        .subscribe(summoners => {

          summoners.forEach(element => {
            Object.keys(element).map(key => {
              let objectSummoner = element[key];
              if (key != "$exists" && objectSummoner instanceof Object) {
                if (summonerName == element[key].name) {
                  resolve(element[key].id);
                  subscription.unsubscribe;
                }
              }
            });
          })
          //resolve(-1);
        });
    });
  }

  getSummonersByUser() {
    return this.summonersDb;
  }

  getFavBySummonerAndUser(summonerId: number) {
    return new Promise(resolve => {
      let subscription = this.getSummonersByUser()
        .subscribe(summoners => {

          summoners.forEach(element => {
            Object.keys(element).map(key => {
              let objectSummoner = element[key];
              if (key != "$exists" && objectSummoner instanceof Object) {
                if (summonerId == element[key].id) {
                  resolve(true);
                  subscription.unsubscribe;
                }
              }
            });
          })

        });
    });
  }

  addFavSummonerByUser(summoner: string, summonerId: number, user: string) {
    this.summonersDb = this.database.list('/summoners/' + user.replace('.', '') + '/' + summonerId + '/');
    this.summonersDb.push({
      name: summoner,
      id: summonerId
    });
  }
}
