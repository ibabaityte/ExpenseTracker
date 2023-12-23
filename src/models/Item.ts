export class Item {
    private isIncome: boolean;
    private category: string;
    private amount: number;

    constructor(isIncome: boolean, category: string, amount: number) {
        this.isIncome = isIncome;
        this.category = category; 
        this.amount = amount;
    }

    public get getIsIncome() {
        return this.isIncome;
    }

    public get getCategory() {
        return this.category;
    }

    public get getAmount() {
        return this.getIsIncome ? this.amount : -this.amount;
    }
}