import { History } from "../../src/models/History";
import { Item } from "../../src/models/Item";

describe("History tests", () => {
    let isIncome: boolean, isExpense: boolean;
    let incomeAmount: number, expenseAmount1: number, expenseAmount2: number;
    let item1: Item, item2: Item, item3: Item;
    let history: History;
    let itemList: Item[] = [];
    let itemListLength: number;
    let balance = 0, income = 0, expenses = 0;
    let expectedBalance: number, expectedIncome: number, expectedExpenses: number;

    beforeAll(() => {
        isIncome = true;
        isExpense = false;
        incomeAmount = 2000;
        expenseAmount1 = -20;
        expenseAmount2 = -50;

        expectedBalance = incomeAmount + expenseAmount1 + expenseAmount2;
        expectedIncome = incomeAmount;
        expectedExpenses = expenseAmount1 + expenseAmount2;

        item1 = new Item(isIncome, "Investments", incomeAmount);
        item2 = new Item(isExpense, "Food", expenseAmount1);
        item3 = new Item(isExpense, "Pet supplies", expenseAmount2);
    });

    test("Constructor test", () => {
        history = new History(itemList, balance, income, expenses);
        expect(history).toBeInstanceOf(History);
    });

    test("getInstance() test - return the same instance", () => {
        const history1 = History.getInstance();
        const history2 = History.getInstance();

        expect(history1).toBe(history2);
    });

    test("updateItemList() test", () => {
        history.updateItemList(item1);
        history.updateItemList(item2);
        history.updateItemList(item3);
        itemList = history.getItemList;
        itemListLength = itemList.length;

        expect(itemList).toContain(item1);
        expect(itemList).toContain(item2);
        expect(itemList).toContain(item3);

        expect(itemList).toHaveLength(itemListLength);
    });

    test("updateBalance() test", () => {
        history.updateBalance(isIncome, incomeAmount);
        history.updateBalance(isExpense, expenseAmount1);
        history.updateBalance(isExpense, expenseAmount2);
        balance = history.getBalance;
        income = history.getIncome;
        expenses = history.getExpenses;

        expect(balance).toEqual(expectedBalance);
        expect(income).toEqual(expectedIncome);
        expect(expenses).toEqual(expectedExpenses);
    });

    test("getItemList() test", () => {
        itemList = history.getItemList;
        itemListLength = itemList.length;

        expect(itemList).toContain(item1);
        expect(itemList).toContain(item2);
        expect(itemList).toContain(item3);

        expect(itemList).toHaveLength(itemListLength);
    });

    test("getBalance() test", () => {
        balance = history.getBalance;

        expect(balance).toEqual(expectedBalance);
    });

    test("getIncome() test", () => {
        income = history.getIncome;

        expect(income).toEqual(expectedIncome);
    });

    test("getExpenses() test", () => {
        expenses = history.getExpenses;

        expect(expenses).toEqual(expectedExpenses);
    });
});