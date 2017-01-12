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
    this.summonersDb = this.database.list('/summoners/' + user.user.replace('.', '') + '/');
  }

  exist(region: string, summoner: string): number {
    return -1;
  }

  getSummonersByUser(user: string): Array<SummonerModel> {
    let summoners = new Array<SummonerModel>();
    this.summonersDb.forEach(summoner => {
      let newSummoner = new SummonerModel();
      console.log("****SUMMONER FAV***", summoner[0].name)
      newSummoner.id = summoner[0].id;
      newSummoner.name = summoner[0].name;
      summoners.push(newSummoner);
    });
    return summoners;
  }

  getFavBySummonerAndUser(summonerId: number, user: string): boolean {

    this.getSummonersByUser(user).forEach((element) => {
      if (element.id == summonerId) {
        return true;
      }
    });
    return false;
  }

  addFavSummonerByUser(summoner: string, summonerId: number, user: string) {
    this.summonersDb = this.database.list('/summoners/' + user.replace('.', '') + '/' + summonerId + '/');
    this.summonersDb.push({
      name: summoner,
      id: summonerId
    });
  }
}
