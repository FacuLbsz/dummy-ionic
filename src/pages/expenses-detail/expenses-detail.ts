import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { HelloIonicPage } from '../hello-ionic/hello-ionic';

@Component({
    templateUrl: "expenses-detail.html"
})

export class ExpensesDetailsPage {

    public inputDetail: string;
    public inputAmount: number;
    public inputDate: Date;

    constructor(public navCtrl: NavController, public params: NavParams) {
        this.inputDetail = params.get("detail");
        this.inputAmount = params.get("amount");
        this.inputDate = params.get("date");
        console.log(this.inputDetail);
        console.log(this.inputAmount);
        console.log(this.inputDate);
    }

    logValues() {
        this.navCtrl.setRoot(HelloIonicPage);
    }

    

}


