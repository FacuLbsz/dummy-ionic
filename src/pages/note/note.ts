import { Card } from './../form/card/MyCard';
import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-note',
  templateUrl: 'note.html'
})

export class NotePage {

  @Input("card") insideCard: Card;

  constructor(public navCtrl: NavController) {
  }

  getContent(card): string {
    return "Ahora que tenemos el lanzamiento mundial de Battlefield™ 1, miro atrás y veo que el equipo de DICE ha realizado un viaje que empezó con un atrevido paso. Años después, resulta casi surrealista tener en la mano el resultado final, afrontar los inicios de la guerra total junto al resto de la comunidad.";
  }


}
