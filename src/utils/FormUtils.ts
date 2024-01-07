import { history } from "../app.js";
import { Item } from "../models/Item.js";
import { IndicatorEnum } from "../enums/Enums.js";
import {
    InputValuesInterface,
    InputsInterface,
    PlaceholdersInterface
} from "../interfaces/Interfaces.js";

export class FormUtils {
    static findInputs = (): InputsInterface => {
        const typeInput = document.getElementById("income")! as HTMLInputElement;
        const categoryInput = document.getElementById("newCategory")! as HTMLSelectElement;
        const amountInput = document.getElementById("amountInput")! as HTMLInputElement;
        return { typeInput, categoryInput, amountInput };
    }

    static gatherInputValues = (inputs: InputsInterface): InputValuesInterface => {
        let isIncome = inputs.typeInput.checked;
        let category = inputs.categoryInput.value;
        let amount = +inputs.amountInput.value;
        return { isIncome, category, amount };
    }

    static createPlaceholders = (): PlaceholdersInterface => {
        const typeIndicatorElement = document.createElement("div");
        const categoryElement = document.createElement("p");
        const amountElement = document.createElement("p");
        return { typeIndicatorElement, categoryElement, amountElement };
    }

    static fillPlaceholders = (item: Item, placeholders: PlaceholdersInterface) => {
        placeholders.typeIndicatorElement.classList.add(item.getIsIncome ? IndicatorEnum.Positive : IndicatorEnum.Negative);
        placeholders.typeIndicatorElement.classList.add("indicator");

        placeholders.categoryElement.className = "category";
        placeholders.categoryElement.textContent = item.getCategory;

        placeholders.amountElement.className = "amount";
        placeholders.amountElement.textContent = item.getAmount.toString();
    }

    static renderItemList = () => {
        let listElement = document.querySelector("#historyList")! as HTMLDivElement;
        listElement.innerHTML = "";

        for (let item of history.getItemList) {
            const listItem = document.createElement("div");
            listItem.classList.add("listItem");

            const placeholders: PlaceholdersInterface = this.createPlaceholders();
            this.fillPlaceholders(item, placeholders);

            listItem.append(...Object.values(placeholders));
            listElement.appendChild(listItem);
        }
    }

    static updateBalance = () => {
        document.querySelector("#balanceAmount")!.innerHTML = history.getBalance.toString();
        document.querySelector("#incomeCount")!.innerHTML = history.getIncome.toString();
        document.querySelector("#expensesCount")!.innerHTML = (-history.getExpenses).toString();
    }

    static onSubmit = (event: Event) => {
        event.preventDefault();

        const inputs: InputsInterface = this.findInputs();
        const inputValues = this.gatherInputValues(inputs);

        let newItem = new Item(inputValues.isIncome, inputValues.category, inputValues.amount);
        history.updateItemList(newItem);
        history.updateBalance(newItem.getIsIncome, newItem.getAmount);

        this.renderItemList();
        this.updateBalance();
    }
}