import { IndicatorEnum } from "../../src/enums/Enums";
import { InputValuesInterface, InputsInterface, PlaceholdersInterface } from "../../src/interfaces/Interfaces";
import { Item } from "../../src/models/Item";
import { FormUtils } from "../../src/utils/FormUtils";
import { History } from "../../src/models/History";
import fs from "fs";
import * as path from 'path';

describe("Form utilities tests", () => {
    let item1: Item, item2: Item;
    let history: History;
    let inputs: InputsInterface;
    let inputValues: InputValuesInterface;
    let createdPlaceholders: PlaceholdersInterface;
    let htmlBlueprint: string;

    beforeAll(() => {
        const htmlBlueprintPath = path.join(__dirname, '../testUtils/appHtmlBlueprint.html');
        htmlBlueprint = fs.readFileSync(htmlBlueprintPath, 'utf-8');
        document.body.innerHTML = htmlBlueprint;

        item1 = new Item(true, "Investments", 2000);
        item2 = new Item(true, "Pension", 2000);

        history = History.getInstance();
        history.updateItemList(item1);
        history.updateItemList(item2);

        inputs = FormUtils.findInputs();
        inputValues = FormUtils.gatherInputValues(inputs);
        createdPlaceholders = FormUtils.createPlaceholders();
        FormUtils.fillPlaceholders(item1, createdPlaceholders);
        FormUtils.renderItemList();
        FormUtils.updateBalance();
    });

    test("findInputs() test", () => {
        expect(inputs).toHaveProperty("typeInput");
        expect(inputs).toHaveProperty("categoryInput");
        expect(inputs).toHaveProperty("amountInput");

        expect(inputs.typeInput.id).toBe("income");
        expect(inputs.typeInput).toBeInstanceOf(HTMLInputElement);

        expect(inputs.categoryInput.id).toBe("newCategory");
        expect(inputs.categoryInput).toBeInstanceOf(HTMLSelectElement);

        expect(inputs.amountInput.id).toBe("amountInput");
        expect(inputs.amountInput).toBeInstanceOf(HTMLInputElement);
    });

    test("gatherInputValues() test", () => {
        expect(inputValues).toHaveProperty("isIncome");
        expect(inputValues).toHaveProperty("category");
        expect(inputValues).toHaveProperty("amount");

        // expect(inputValues.isIncome).toBeTruthy();
        expect(inputValues.isIncome).toEqual(true);

        // expect(inputValues.category).toBeTruthy();
        expect(typeof inputValues.category).toBe("string");
        expect(inputValues.category.length).toBeGreaterThan(0);

        // expect(inputValues.amount).toBeTruthy();
        expect(typeof inputValues.amount).toBe("number");
        expect(inputValues.amount).toBeGreaterThan(0);
        expect(inputValues.amount < 0 || inputValues.amount > 0).toBeTruthy();
    });

    test("createPlaceholders() test", () => {
        expect(createdPlaceholders).toHaveProperty("typeIndicatorElement");
        expect(createdPlaceholders).toHaveProperty("categoryElement");
        expect(createdPlaceholders).toHaveProperty("amountElement");

        expect(createdPlaceholders.typeIndicatorElement).toBeInstanceOf(HTMLDivElement);
        expect(createdPlaceholders.categoryElement).toBeInstanceOf(HTMLParagraphElement);
        expect(createdPlaceholders.amountElement).toBeInstanceOf(HTMLParagraphElement);
    });

    test("fillPlaceholders() test", () => {
        let itemClass = item1.getIsIncome ? IndicatorEnum.Positive : IndicatorEnum.Negative;

        expect(createdPlaceholders.typeIndicatorElement.classList.contains(itemClass)).toBe(true);
        expect(createdPlaceholders.typeIndicatorElement.classList.contains("indicator")).toBe(true);

        expect(createdPlaceholders.categoryElement.classList.contains("category")).toBe(true);
        expect(createdPlaceholders.categoryElement.textContent).toBe(item1.getCategory)

        expect(createdPlaceholders.amountElement.classList.contains("amount")).toBe(true);
        expect(createdPlaceholders.amountElement.textContent).toBe(item1.getAmount.toString());
    });

    test("renderItemList() test", async () => {
        let listItem: HTMLDivElement = document.getElementById("historyList")! as HTMLDivElement;
        let htmlItems: HTMLCollection = document.getElementsByClassName("listItem")!;
        let numberOfHistoryItems: number = history.getItemList.length;

        for (let i = 0; i < htmlItems.length; i++) {
            expect(listItem.contains(htmlItems[i])).toBe(true);
        }

        expect(htmlItems.length).toBe(numberOfHistoryItems);
    });

    test("updateBalance() test", () => {
        let balanceElement: HTMLSpanElement = document.querySelector("#balanceAmount")!;
        let incomeElement: HTMLSpanElement = document.querySelector("#incomeCount")!;
        let expensesElement: HTMLSpanElement = document.querySelector("#expensesCount")!
        
        expect(balanceElement.innerHTML).toEqual(history.getBalance.toString());
        expect(incomeElement.innerHTML).toEqual(history.getIncome.toString());
        expect(expensesElement.innerHTML).toEqual(history.getExpenses.toString());
    });
});