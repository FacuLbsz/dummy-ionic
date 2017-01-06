import { Component } from '@angular/core';
import { NotePage } from './../note/note';
import { NavController, NavParams } from 'ionic-angular';
import { Card } from './../form/card/MyCard';

@Component({
  selector: 'page-card-detail',
  templateUrl: 'card-detail.html',
  entryComponents: [NotePage]
})

export class CardDetailPage {

  public card: Card;

  constructor(public navCtrl: NavController, public navPrms: NavParams) {
    this.card = navPrms.get("card");
  }
}
