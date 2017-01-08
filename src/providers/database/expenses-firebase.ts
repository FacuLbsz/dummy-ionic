import { UserForm } from './../../pages/form/user/user-form';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2';

@Component({

})
export class ExpensesFirebase {

    expensesDb: FirebaseListObservable<any>;

    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public database: AngularFireDatabase,
        public user: UserForm,
    ) {
        console.log('/expenses/' + user.user.replace('.',''));
        this.expensesDb = this.database.list('/expenses/' + user.user.replace('.',''));
    }

    createExpense(id, detail, amount, date) {
        this.expensesDb.push({
            detail: detail,
            amount: amount,
            date: date
        });
    }

    getExpenses() {
        return this.expensesDb;
    }

    updateTask(task) {
        setTimeout(() => {
            this.expensesDb.update(task.$key, {
                title: task.title,
                done: task.done
            });
        }, 1);
    }

    removeExpense(expenseKey) {
        this.expensesDb.remove(expenseKey);
    }

}