class Utils {
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
}