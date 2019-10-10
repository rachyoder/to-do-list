LIST_ITEMS = {};
ITEMS_ARRAY = [];
ITEM_ID = 0;

ITEMS_ARRAY = JSON.parse(localStorage.getItem("todos", LIST_ITEMS));

/* Input Constructor */

class Input {
    constructor(name, id, completed, archive) {
        this.name = name;
        this.id = id;
        this.completed = false;
        this.archive = false;
    }
}
// let item = JSON.parse(localStorage.getItem("todos", LIST_ITEMS));
// console.log({ item });

function storeInput(e) {
    if (e.keyCode === 13) {
        let latestItem = document.getElementById("input_text").value;
        document.getElementById("input_text").value = "";
        console.log({ latestItem });

        let input = new Input(
            latestItem,
            ITEM_ID
        );
        ITEM_ID++;
        ITEMS_ARRAY.push(input);
        LIST_ITEMS = ITEMS_ARRAY;
        localStorage.setItem("todos", JSON.stringify(LIST_ITEMS));
    }
}

function populateTable() {

}