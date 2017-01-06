import { Expenses } from './../../app/database';
import { ExpensesService } from './../../providers/expenses-service';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ExpensesDetailsPage } from '../expenses-detail/expenses-detail';


@Component({
    templateUrl: "expenses.html"
})
export class ExpensesForm {

    public date: string = new Date().toISOString();
    public todo = { inputDetail: '', inputAmount: "", date: this.date }
    public totalExpenses: number = 0;

    private id: number = 0;

    public expenses: Array<any> = new Array<any>();
    public observations: Array<any> = new Array<any>();

    constructor(public nav: NavController, public alertCtrl: AlertController, public params: NavParams, public expensesService: ExpensesService, public toastCtrl: ToastController) {
        this.loadExpenses();

    }

    addExpense() {
        if (this.todo.inputDetail.length != 0 && this.todo.inputAmount.length != 0) {
            let dbExpense = new Expenses(this.todo.inputDetail, parseInt(this.todo.inputAmount), new Date(this.todo.date));
            var idExpense: number;
            dbExpense.save().then((onFulfilled) => {
                idExpense = onFulfilled;
            });
            console.log("id nuevo:" + idExpense)
            this.addItem(idExpense, this.todo.inputDetail, this.todo.inputAmount, this.todo.date);
            this.cleanForm();
        }
    }

    addItem(id, detail, amount, date) {
        this.expenses.unshift({ id: id, detail: detail, amount: amount, date: date });
        this.totalExpenses = this.totalExpenses + parseInt(amount);
        this.id++;

    }

    loadExpenses() {

        /* let dummyData: any[] = [];
 
         this.expensesService.getData().then(data => {
 
             dummyData = data;
 
             for (var i = 0; i < dummyData.length; i++) {
                 this.addItem(dummyData[i].name.first, dummyData[i].location.postcode, new Date());
             }
 
         })*/

        Expenses.all().then((resultados) => {
            let dummyData: any[] = [];
            dummyData = resultados;
            for (var i = 0; i < dummyData.length; i++) {
                this.addItem(dummyData[i].id, dummyData[i].detail, dummyData[i].amount, dummyData[i].date);
            }
        })


    }

    cleanForm() {

        this.todo = { inputDetail: '', inputAmount: "", date: this.date }

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


        Expenses.remove(expenseToDelete.id).then((resultados) => {
            console.log("Resultado de delete" + resultados);
            for (var i = 0; i < this.expenses.length; i++) {
                if (this.expenses[i].id == expenseToDelete.id) {

                    this.totalExpenses = this.totalExpenses - parseInt(this.expenses[i].amount);
                    this.expenses.splice(i, 1);
                }
            }
        })

    }

    successfullCreate() {
        let toast = this.toastCtrl.create({
            message: 'Gasto creado correctamente',
            duration: 1500
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }


}