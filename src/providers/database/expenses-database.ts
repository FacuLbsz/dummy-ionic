import Dexie from 'dexie';

export class TransactionAppDB extends Dexie {

    expenses: Dexie.Table<IExpenses, number>;

    constructor() {
        super("ExpensesMyFirstApp");

        this.version(1).stores({ expenses: "++id,detail,amount" });

        this.expenses.mapToClass(Expenses);
    }

}

export interface IExpenses {

    id?: number;
    detail: string;
    amount: number;

}

export class Expenses implements IExpenses {

    id?: number;
    detail: string;
    amount: number;
    date: Date;

    constructor(detail: string, amount: number, date: Date, id?: number) {
        this.detail = detail;
        this.amount = amount;
        this.date = date;
        if (id) this.id = id;
    }

    save(){
        return db.expenses.add(this);
    }

    static all() {
        return db.expenses.orderBy("id").reverse().toArray();
    }

    static remove(id: number) {
        return db.expenses.delete(id);
    }

}

export let db = new TransactionAppDB();