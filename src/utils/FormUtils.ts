import { history } from "../app.js";
import { Item } from "../models/Item.js";
import { inputValuesInterface, inputsInterface } from "../interfaces/interfaces.js";

export class FormUtils {

    static findInputs = (): inputsInterface => {
        const typeInput = document.getElementById("income")! as HTMLInputElement;
        const categoryInput = document.getElementById("newCategory")! as HTMLInputElement;
        const amountInput = document.getElementById("amountInput")! as HTMLInputElement;

        return { typeInput, categoryInput, amountInput };
    }

    static gatherInputValues = (
        typeInput: HTMLInputElement,
        categoryInput: HTMLInputElement,
        amountInput: HTMLInputElement
    ): inputValuesInterface => {
        let isIncome = typeInput.checked;
        let category = categoryInput.value;
        let amount = +amountInput.value;

        return { isIncome, category, amount };
    }

    static onSubmit = (event: Event) => {
        event.preventDefault();

        const { typeInput, categoryInput, amountInput } = this.findInputs();
        const { isIncome, category, amount } = this.gatherInputValues(typeInput, categoryInput, amountInput);

        let newItem = new Item(isIncome, category, amount);
        history.updateItemList(newItem);
        history.updateBalance(isIncome, amount);
    }
}