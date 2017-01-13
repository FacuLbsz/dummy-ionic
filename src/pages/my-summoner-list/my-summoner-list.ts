import { SummonerModel } from './../form/summoner/summoner-model';
import { MyOpGGImp } from './../../providers/my-op-gg-imp';
import { UserForm } from './../form/user/user-form';
import { AuthService } from './../../providers/auth/auth.service';
import { MySummoners } from './../../providers/my-summoners';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public mySummonersService: MySummoners, public auth: AuthService, public riotService: MyOpGGImp, public toastCtrl: ToastController) {

    this.user = auth.getUser();
    mySummonersService.load(this.user);
    this.loadSummoners();
  }

  ionViewDidLoad() {
    console.log('Hello MySummonerListPage Page');
  }

  loadSummoners() {
    this.summoners = new Array<SummonerModel>();
    this.mySummonersService.getSummonersByUser()
      .subscribe(summoners => {
        this.populateList(summoners);
      });
  }

  populateList(elements) {
    elements.forEach(element => {
      let summoner = this.newMainObject();
      summoner.key = element.$key;
      Object.keys(element).map(key => {
        let objectSummoner = element[key];
        if (key != "$exists" && objectSummoner instanceof Object) {
          summoner = element[key];
          this.summoners.push(summoner);
        }

      });
    })

  }

  newMainObject(): any {
    return new SummonerModel();
  }


  searchSummoner() {
    console.log(this.region);
    if (this.summoner.length > 0) {
      this.mySummonersService.exist(this.region, this.summoner)
        .then((summonerId: any) => {
          if (summonerId > -1) {
            console.log('***********EXISTE EN BD*************')
            this.riotService.getSummonerCurrentGameInfoById(this.region, summonerId)
              .then(data => {
                console.table(data);
              });
            this.mySummonersService.addFavSummonerByUser(this.region, summonerId, this.summoner);
          } else {
            this.riotService.getSummonerIdByName(this.region, this.summoner)
              .then((data: any) => {
                console.table(data);
                let toast = this.toastCtrl.create({
                  message: 'nice ' + data.id,
                  duration: 3000,
                  position: 'bottom'
                });
                toast.present();
                this.riotService.getSummonerCurrentGameInfoById(this.region, data.id).then((res: any) => {
                  console.table(res);
                  let toast = this.toastCtrl.create({
                    message: 'very nice ' + res.gameId,
                    duration: 3000,
                    position: 'middle'
                  });
                  toast.present();
                });
              }).catch(error => {
                let toast = this.toastCtrl.create({
                  message: 'Error' + error,
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
              });
          }
        });
    }
  }

  addSummonerToFav() {
    if (this.summoner.length > 0) {
      this.mySummonersService.exist(this.region, this.summoner)
        .then((summonerId: any) => {
          if (summonerId > -1) {
            console.log('***********EXISTE EN BD*************')
            this.mySummonersService.getFavBySummonerAndUser(summonerId)
              .then((data) => {
                if (data) {
                  console.log('***********Ya existe como favoritos*************');
                }
                else {
                  console.log("Agregando summoner");
                }
              })

          } else {
            this.riotService.getSummonerIdByName(this.region, this.summoner).then((data) => {
              let dataSummoners: any = data;
              summonerId = dataSummoners.id;
              console.error("*********post getSummonerIdByName************", summonerId);
              if (summonerId > -1) {
                //agregar a summoner fav
                let newSummoner = new SummonerModel();
                newSummoner.id = summonerId;
                newSummoner.name = this.summoner;
                //this.summoners.push(newSummoner);
                this.mySummonersService.addFavSummonerByUser(this.summoner, newSummoner.id, this.user.user);
                console.error("*********No (existe el usuario************", summonerId);
              }
              else {
                console.error("*********No existe el usuario************", summonerId);
              }

            });
          }
        });
    }
  }
}
