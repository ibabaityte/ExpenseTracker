export interface inputValuesInterface {
    isIncome: boolean,
    category: string,
    amount: number
}

export interface inputsInterface {
    typeInput: HTMLInputElement,
    categoryInput: HTMLInputElement,
    amountInput: HTMLInputElement
}

export interface placeholdersInterface {
    listItem: HTMLDivElement,
    typeIndicatorElement: HTMLDivElement,
    categoryElement: HTMLParagraphElement,
    amountElement: HTMLParagraphElement
}