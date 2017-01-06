import { AuthService } from './../../app/auth.service';
import { CardDetailPage } from './../card-detail/card-detail';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Card } from './../form/card/MyCard';


/*
  Generated class for the DumyVideos page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dumy-videos',
  templateUrl: 'dumy-videos.html'
})
export class DumyVideosPage {

  public videos: Array<Card> = new Array<Card>();

  constructor(public navCtrl: NavController,public auth: AuthService) {

   /* let dummy:any = [{nickname: ''}];

    dummy = auth.user;

    console.log(dummy.nickname);*/
    this.populatVideos();
  }

  ionViewDidLoad() {
    console.log('Hello DumyVideosPage Page');
  }

  populatVideos() {

    this.videos.push(new Card('Tierra de nadie', 'Un dominio sin sobrevivientes', 'card-battlefield-1.png'));
    this.videos.push(new Card('Soldado de dios', 'La habilidad de todo un teniente', 'card-battlefield-2.png'));
    this.videos.push(new Card('Se apaga el cielo', 'Imposible esconderse', 'card-battlefield-3.png'));
    this.videos.push(new Card('El fin', 'Uno a uno el final les llega', 'card-battlefield-4.png'));

  }

  getCardDetails(card: Card) {
    console.log(card.title);
    this.navCtrl.push(CardDetailPage, {card});

  }

}

