import { AuthService } from './../../providers/auth/auth.service';
import { UserForm } from './../form/user/user-form';
import { ExpensesFirebase } from './../../providers/database/expenses-firebase';
import { AngularFireDatabase } from 'angularfire2';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ExpensesDetailsPage } from '../expenses-detail/expenses-detail';


@Component({
    templateUrl: "expenses.html"
})
export class ExpensesForm {

    public date: string = new Date().toISOString();
    public todo = { inputDetail: '', inputAmount: "", date: this.date }
    public totalExpenses: number = 0;

    public expenses_firebase: ExpensesFirebase;

    private id: number = 0;
    public expenses: Array<any> = new Array<any>();
    public isEmptyExpenses: boolean = false;

    public observations: Array<any> = new Array<any>();

    public user: UserForm;

    constructor(public nav: NavController, public alertCtrl: AlertController, public params: NavParams, public database: AngularFireDatabase, public auth: AuthService) {

        this.user = auth.getUser();

        this.expenses_firebase = new ExpensesFirebase(nav, alertCtrl, database, this.user);
        this.expenses_firebase.getExpenses().subscribe(expns => {
            let dummyArray: Array<any> = expns;
            if (dummyArray != null && dummyArray.length != null) {
                this.expenses = new Array<any>();
                this.totalExpenses = 0;
                this.isEmptyExpenses = true;
                for (var i = 0; i < dummyArray.length; i++) {
                    this.expenses.push({ id: expns[i].id, detail: expns[i].detail, amount: expns[i].amount, date: expns[i].date, key: expns[i].$key });
                    this.totalExpenses = this.totalExpenses + parseInt(expns[i].amount);
                }
            }
        });
    }

    addExpense() {
        if (this.todo.inputDetail.length != 0 && this.todo.inputAmount.length != 0) {
            this.expenses_firebase.createExpense(this.id, this.todo.inputDetail, this.todo.inputAmount, this.todo.date);
            this.cleanForm();
            this.id++;
        }
        this.listComments();
    }

    cleanForm() {

        this.todo.inputDetail = '';
        this.todo.inputAmount = "";
        this.todo.date = new Date().toISOString();

    }

    getDetail(expense) {
        this.nav.push(ExpensesDetailsPage, { detail: expense.detail, amount: expense.amount, date: expense.date });
    }

    addComments() {
        let alert = this.alertCtrl.create({
            title: 'Nueva observacion',
            message: 'Crear nueva observacion sobre los gastos',
            inputs: [
                {
                    name: 'observacion',
                    label: 'Observación'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                },
                {
                    text: 'Añadir',
                    handler: data => {
                        this.observations.push(data.observacion);
                    }
                }
            ]
        });
        alert.present();
    }

    listComments() {

        for (let expense of this.expenses) {
            console.log(expense.detail);
        }

    }

    removeExpense(expenseToDelete) {
        this.expenses_firebase.removeExpense(expenseToDelete);
    }


}