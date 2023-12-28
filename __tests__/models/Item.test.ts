import { Item } from "../../src/models/Item";

describe("Item tests", () => {
    const isIncome = true;
    const incomeCategory = "Investment";
    const incomeAmount = 2000;
    let item: Item;

    beforeAll(() => {
        item = new Item(isIncome, incomeCategory, incomeAmount);
    });

    test("Constructor test", () => {
        expect(item).toBeInstanceOf(Item);
    });

    test("Getters test", () => {
        expect(item.getIsIncome).toEqual(isIncome);
        expect(item.getCategory).toEqual(incomeCategory);
        expect(item.getAmount).toEqual(incomeAmount);
    });
})