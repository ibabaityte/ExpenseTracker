import { Item } from "./Item";

export class History {
    private itemList: Item[];
    private balance: number;
    private income: number;
    private expenses: number;
    private static instance: History;

    constructor(items: Item[], balance: number, income: number, expenses: number) {
        this.itemList = items;
        this.balance = balance;
        this.income = income;
        this.expenses = expenses;
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        } else {
            this.instance = new History([], 0, 0, 0);
            return this.instance;
        }
    }

    public get getItemList() { return this.itemList };

    public get getBalance() { return this.balance; }

    public get getIncome() { return this.income; }

    public get getExpenses() { return this.expenses; }

    updateItemList(newItem: Item) {
        this.itemList.push(newItem);
    }

    updateBalance(isIncome: boolean, amount: number) {
        this.balance += amount;

        if (isIncome) {
            this.income += amount;
        } else {
            this.expenses += amount;
        }
    }
}