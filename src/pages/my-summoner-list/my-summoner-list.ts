import { SummonerModel } from './../form/summoner/summoner-model';
import { MyOpGGImp } from './../../providers/my-op-gg-imp';
import { UserForm } from './../form/user/user-form';
import { AuthService } from './../../providers/auth/auth.service';
import { MySummoners } from './../../providers/my-summoners';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the MySummonerList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-summoner-list',
  templateUrl: 'my-summoner-list.html'
})
export class MySummonerListPage {

  summoners: Array<SummonerModel> = new Array<SummonerModel>();
  regions: string[] = ['LAS', 'NA'];

  summoner: string = "";
  region: string = "";

  public user: UserForm;

  constructor(public navCtrl: NavController, public mySummonersService: MySummoners, public auth: AuthService, public riotService: MyOpGGImp) {

    this.user = auth.getUser();
  }

  ionViewDidLoad() {
    console.log('Hello MySummonerListPage Page');
    this.loadSummoners();
  }

  loadSummoners() {
    this.summoners = this.mySummonersService.getSummonersByUser(this.user.user);
  }

  searchSummoner() {

    if (this.summoner.length > 0) {
      let summonerId: number = this.mySummonersService.exist(this.region, this.summoner);
      if (summonerId > -1) {
        console.log('***********EXISTE EN BD*************')
        console.table(this.riotService.getSummonerCurrentGameInfoById(this.region, summonerId));
      } else {
        console.log(this.riotService.getSummonerIdByName(this.region, this.summoner));
      }
    }
  }

  addSummonerToFav() {
    if (this.summoner.length > 0) {
      let summonerId: number = this.mySummonersService.exist(this.region, this.summoner);
      if (summonerId > -1) {
        console.log('***********EXISTE EN BD*************')
        let isFavByUser: boolean = this.mySummonersService.getFavBySummonerAndUser(summonerId, this.user.user);

        if (isFavByUser) {
          console.log('***********Ya existe como favoritos*************');
        }
        else {
          console.log("Agregando summoner");
        }
      } else {
        let summonerId: number = this.riotService.getSummonerIdByName(this.region, this.summoner);
        if (summonerId > -1) {
          //agregar a summoner fav
          this.summoners.push(new SummonerModel());
        }
        else {
          console.error("*********No existe el usuario************");
        }
      }
    }
  }
}
