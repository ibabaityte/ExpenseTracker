export interface InputValuesInterface {
    isIncome: boolean,
    category: string,
    amount: number
}

export interface InputsInterface {
    typeInput: HTMLInputElement,
    categoryInput: HTMLSelectElement,
    amountInput: HTMLInputElement
}

export interface PlaceholdersInterface {
    typeIndicatorElement: HTMLDivElement,
    categoryElement: HTMLParagraphElement,
    amountElement: HTMLParagraphElement
}