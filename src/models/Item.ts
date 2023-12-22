export class Item {
    protected isIncome: boolean;
    protected category: string;
    protected amount: number;

    constructor(isIncome: boolean, category: string, amount: number) {
        this.isIncome = isIncome;
        this.category = category; 
        this.amount = amount;
    }
}