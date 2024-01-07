import { History } from "./models/History.js";
import { FormUtils } from "./utils/FormUtils.js";

export const history = History.getInstance();
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form")!;
    form.addEventListener("submit", FormUtils.onSubmit);
});