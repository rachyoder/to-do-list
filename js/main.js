let LIST_ITEMS = {};
let ITEMS_ARRAY = [];
let ITEM_ID = 0;
let DISPLAY_STATE = "btn_all";
let MASTER_CHECK = false;

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
    let table_head = document.createElement("thead");
    let table_body = document.createElement("tbody");
    let active_count = 0;

    table_main.setAttribute("class", " table table-borderless mx-5")

    /* Create the body of the table - contains all tasks */
    for (let j = 0; j < ITEMS_ARRAY.length; j++) {
        if (checkForDisplay(ITEMS_ARRAY[j])) {
            let table_row = document.createElement("tr");
            for (let i = 0; i < 3; i++) {
                if (i == 0) {
                    let table_item = document.createElement("td");
                    let complete_checkbox = document.createElement("input")
                    complete_checkbox.setAttribute("type", "checkbox");
                    complete_checkbox.setAttribute("id", j);
                    if (ITEMS_ARRAY[j].completed == true) {
                        complete_checkbox.setAttribute("checked", "true");
                    } else {
                        complete_checkbox.setAttribute("unchecked", "true");
                    }
                    complete_checkbox.addEventListener("change", checkCompleted);
                    table_item.appendChild(complete_checkbox);
                    table_row.appendChild(table_item);
                } else if (i == 1) {
                    let table_item = document.createElement("td");
                    table_item.setAttribute("id", "name" + j);
                    table_item.setAttribute("class", "text-center");
                    table_item.setAttribute("style", "word-break: break-word;");
                    if (ITEMS_ARRAY[j].completed == true) {
                        table_item.setAttribute("style", "text-decoration: line-through; color: #cccccc");
                    } else {
                        table_item.setAttribute("style", "text-decoration: ;")
                    }
                    table_item.innerHTML = ITEMS_ARRAY[j]["name"];
                    table_row.appendChild(table_item);
                } else if (i == 2) {
                    let table_item = document.createElement("td");
                    let delete_button = document.createElement("button");
                    delete_button.setAttribute("id", j);
                    delete_button.setAttribute("class", "btn btn-light text-secondary px-1 py-0 float-right");
                    delete_button.innerHTML = "X";
                    delete_button.addEventListener("click", checkDeleted);

                    table_item.appendChild(delete_button);
                    table_row.appendChild(table_item);
                }
            }
            table_body.appendChild(table_row);
        }
        if (!(ITEMS_ARRAY[j].completed) && !(ITEMS_ARRAY[j].delete)) {
            active_count++;
        }
    }
    /* Create the Head for the Table */
    let table_row_head = document.createElement("tr");
    for (let k = 0; k < 3; k++) {
        let table_head_item = document.createElement("th");
        if (k == 0) {
            let master_checkbox = document.createElement("input");
            master_checkbox.setAttribute("type", "checkbox");
            master_checkbox.setAttribute("class", "form-control form-control-md p-0")
            master_checkbox.setAttribute("id", "master_checkbox");
            if(MASTER_CHECK){
                master_checkbox.setAttribute("checked", true);
            } else {
                master_checkbox.setAttribute("unchecked", true);
            }
            master_checkbox.addEventListener("change", masterCheckboxAll);
            table_head_item.appendChild(master_checkbox);
            table_row_head.appendChild(table_head_item);
        } else if (k == 1) {
            table_head_item.setAttribute("class", "text-center");
            table_head_item.innerHTML = `Tasks Left: ${active_count}`;
            table_row_head.appendChild(table_head_item);
        } else if (k == 2) {
            let delete_completed = document.createElement("button");
            delete_completed.setAttribute("class", "btn btn-dark text-light px-1 py-0 float-right");
            delete_completed.innerHTML = "X";
            delete_completed.addEventListener("click", clearAllCompleted);
            table_head_item.appendChild(delete_completed);
            table_row_head.appendChild(table_head_item);
        }
        table_head.appendChild(table_row_head);
    }
    table_main.appendChild(table_head);
    table_main.appendChild(table_body);
    let row = document.getElementById("list_row");
    row.innerHTML = "";
    row.appendChild(table_main);

    console.log({ITEMS_ARRAY});
    LIST_ITEMS = ITEMS_ARRAY;
    localStorage.setItem("todos", JSON.stringify(LIST_ITEMS));
}

function checkForDisplay(item) {
    if (!(item.delete)) {
        if (DISPLAY_STATE == "btn_completed") {
            if (item.completed) {
                return true;
            } else {
                return false;
            }
        } else if (DISPLAY_STATE == "btn_active") {
            if (!(item.completed)) {
                console.log(ACTIVE_COUNT);
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    } else {
        return false;
    }
}

function checkCompleted(e) {
    if (document.getElementById(e.target.id).checked) {
        ITEMS_ARRAY[parseInt(e.target.id)].completed = true;

    } else {
        ITEMS_ARRAY[parseInt(e.target.id)].completed = false;
    }
    populateTable();
}

function checkDeleted(e) {
    ITEMS_ARRAY[parseInt(e.target.id)].delete = true;
    populateTable();
}

function changeTableDisplay(e) {
    DISPLAY_STATE = e.target.id;
    populateTable();
}

function masterCheckboxAll(e) {
    console.log(document.getElementById(e.target.id).checked);
    if (document.getElementById(e.target.id).checked) {
        MASTER_CHECK = true;
        for (let i = 0; i < ITEMS_ARRAY.length; i++) {
            if (!(ITEMS_ARRAY[i].delete)) {
                ITEMS_ARRAY[i].completed = true;
            }
        }
    } else {
        for (let i = 0; i < ITEMS_ARRAY.length; i++) {
            MASTER_CHECK = false;
            if (!(ITEMS_ARRAY[i].delete)) {
                ITEMS_ARRAY[i].completed = false;
            }
        }
        
    }
    populateTable();
}

function clearAllCompleted(e) {
    for (let i = 0; i < ITEMS_ARRAY.length; i++) {
        if (ITEMS_ARRAY[i].completed) {
            ITEMS_ARRAY[i].delete = true;
        }
    }
    populateTable();
}