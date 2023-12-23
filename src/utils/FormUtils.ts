import { history } from "../app.js";
import { Item } from "../models/Item.js";
import { IndicatorClass } from "../enums/enums.js";
import {
    inputValuesInterface,
    inputsInterface,
    placeholdersInterface
} from "../interfaces/interfaces.js";

export class FormUtils {

    static findInputs = (): inputsInterface => {
        const typeInput = document.getElementById("income")! as HTMLInputElement;
        const categoryInput = document.getElementById("newCategory")! as HTMLInputElement;
        const amountInput = document.getElementById("amountInput")! as HTMLInputElement;

        return { typeInput, categoryInput, amountInput };
    }

    static gatherInputValues = (typeInput: HTMLInputElement, categoryInput: HTMLInputElement, amountInput: HTMLInputElement): inputValuesInterface => {
        let isIncome = typeInput.checked;
        let category = categoryInput.value;
        let amount = +amountInput.value;

        return { isIncome, category, amount };
    }

    static createPlaceholders = (): placeholdersInterface => {
        const listItem = document.createElement('div');
        const typeIndicatorElement = document.createElement('div');
        const categoryElement = document.createElement('p');
        const amountElement = document.createElement('p');

        return { listItem, typeIndicatorElement, categoryElement, amountElement };
    }

    static fillPlaceholders = (item: Item, placeholders: placeholdersInterface) => {
        placeholders.listItem.className = 'listItem';

        placeholders.typeIndicatorElement.classList.add(item.getIsIncome ? IndicatorClass.Positive : IndicatorClass.Negative);
        placeholders.typeIndicatorElement.classList.add("indicator");

        placeholders.categoryElement.className = 'category';
        placeholders.categoryElement.textContent = item.getCategory;

        placeholders.amountElement.className = 'amount';
        placeholders.amountElement.textContent = item.getAmount.toString();
    }

    static appendToListItem = (liChildren: placeholdersInterface) => {
        liChildren.listItem.append(liChildren.typeIndicatorElement);
        liChildren.listItem.appendChild(liChildren.categoryElement);
        liChildren.listItem.appendChild(liChildren.amountElement);
    }

    static renderItemList = () => {
        let items: Item[] = history.getItemList;
        let listElement = document.querySelector("#historyList")! as HTMLDivElement;

        listElement.innerHTML = "";

        for (let i in items) {

            const placeholders = this.createPlaceholders();

            this.fillPlaceholders(items[i], placeholders);
            this.appendToListItem(placeholders);

            listElement.appendChild(placeholders.listItem);
        }
    }

    static updateBalance = () => {
        let balance = 0;
        let income = 0;
        let expenses = 0;

        for(var item of history.getItemList) {
            balance += item.getAmount;
            if (item.getIsIncome) {
                income += item.getAmount;
            } else {
                expenses += item.getAmount;
            }
        }

        document.querySelector("#balanceAmount")!.innerHTML = balance.toString();
        document.querySelector("#incomeCount")!.innerHTML = income.toString();
        document.querySelector("#expensesCount")!.innerHTML = (-expenses).toString();
    }

    static onSubmit = (event: Event) => {
        event.preventDefault();

        const { typeInput, categoryInput, amountInput } = this.findInputs();
        const { isIncome, category, amount } = this.gatherInputValues(typeInput, categoryInput, amountInput);

        let newItem = new Item(isIncome, category, amount);
        history.updateItemList(newItem);
        history.updateBalance(isIncome, amount);

        this.renderItemList();
        this.updateBalance();
    }
}