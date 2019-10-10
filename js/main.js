let LIST_ITEMS = {};
let ITEMS_ARRAY = [];
let ITEM_ID = 0;

function fetchLocalData() {
    let temp = localStorage.getItem("todos");
    if (temp != null) {
        ITEMS_ARRAY = JSON.parse(temp);
    }
    populateTable();
}

/* Input Constructor */

class Input {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.completed = false;
        this.delete = false;
    }
}

function storeInput(e) {
    if (e.keyCode === 13) {
        let latestItem = e.target.value;
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
        populateTable();
    }
}

function populateTable() {
    let table_main = document.createElement("table");
    let table_body = document.createElement("tbody");

    table_main.setAttribute("class", " table table-borderless mx-5")


    for (let j = 0; j < ITEMS_ARRAY.length; j++) {
        let table_row = document.createElement("tr");
        for (let i = 0; i < 3; i++) {
            if (i == 0) {
                let table_item = document.createElement("td");
                let complete_checkbox = document.createElement("input")
                complete_checkbox.setAttribute("type", "checkbox");
                complete_checkbox.setAttribute("id", j);
                complete_checkbox.addEventListener("change", checkCompleted);
                table_item.appendChild(complete_checkbox);
                table_row.appendChild(table_item);
            } else if (i == 1) {
                let table_item = document.createElement("td");
                table_item.setAttribute("class", "text-center");
                table_item.setAttribute("style", "word-break: break-all;")
                console.log({ ITEMS_ARRAY, ITEM_ID })
                console.log({ ITEMS_ARRAY, })
                table_item.innerHTML = ITEMS_ARRAY[j]["name"];
                table_row.appendChild(table_item);
            } else if (i == 2) {
                let table_item = document.createElement("td");
                let delete_button = document.createElement("button");
                delete_button.setAttribute("class", "btn btn-light text-secondary px-1 py-0");
                delete_button.innerHTML = "X";

                table_item.appendChild(delete_button);
                table_row.appendChild(table_item);
            }
        }
        table_body.appendChild(table_row);
    }
    table_main.appendChild(table_body);
    let row = document.getElementById("list_row");
    row.innerHTML = "";
    row.appendChild(table_main);
}

function checkCompleted(e) {
    if (document.getElementById(e.target.id).checked){
        console.log("checked!");

    }
}