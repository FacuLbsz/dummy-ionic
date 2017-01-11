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

  constructor(public http: Http, public database: AngularFireDatabase) {
    console.log('Hello MySummoners Provider');
  }

  exist(region: string, summoner: string): number {
    return -1;
  }

  getSummonersByUser(user: string): Array<SummonerModel> {
    let summoners = new Array<SummonerModel>();
    this.summonersDb = this.database.list('/summoners/' + user.replace('.', '') + '/');
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
