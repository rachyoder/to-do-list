/* Page Layout */
let APP = document.getElementById("app");
let CONTAINER = document.createElement("div");
CONTAINER.setAttribute("class", "container");
function init() {
    for (let i = 0; i < 4; i++) {
        if (i == 0) {
            let title_row = document.createElement("div");
            let title_col = document.createElement("div");
            title_row.setAttribute("class", "row");
            title_col.setAttribute("class", "col-12 h1 display-4 text-center");
            title_col.innerHTML = "RAPID TASK <span class='text-muted'><strong>SWITCHING</strong></span>"
            title_row.appendChild(title_col);
            CONTAINER.appendChild(title_row);
            APP.appendChild(CONTAINER);
        } else if (i == 1) {
            let input_row = document.createElement("div");
            let input_col = document.createElement("div");
            let input_text = document.createElement("input");

            let list_row = document.createElement("div");
            list_row.setAttribute("id", "list_row");

            input_row.setAttribute("class", "row");
            input_col.setAttribute("class", "col-12 mx-auto");
            input_text.setAttribute("class", "w-100 form-control form-control-lg");
            input_text.setAttribute("style", "border: solid black 1px; border-radius: 5px;")
            input_text.setAttribute("type", "text");
            input_text.setAttribute("id", "input_text");

            input_text.addEventListener("keydown", storeInput);

            list_row.setAttribute("class", "row");

            input_col.appendChild(input_text);
            input_row.appendChild(input_col);
            CONTAINER.appendChild(input_row);
            CONTAINER.appendChild(list_row);
            APP.appendChild(CONTAINER);
        } else if (i == 2) {
            let footer = document.createElement("footer");
            footer.setAttribute("class","footer mt-auto mx-auto py-3");
            let btn_contain = document.createElement("div");
            let btn_row = document.createElement("div");
            let btn_group = document.createElement("div");
            btn_group.setAttribute("class", "btn-group mx-auto");
            btn_group.setAttribute("role", "group");
            for (let j = 0; j < 3; j++) {
                let btn = document.createElement("button");
                btn.setAttribute("class", "btn btn-secondary");
                if (j == 0) {
                    btn.setAttribute("id", "btn_all");
                    btn.innerHTML = "ALL";
                } else if (j == 1) {
                    btn.setAttribute("id", "btn_completed");
                    btn.innerHTML = "COMPLETED";
                } else {
                    btn.setAttribute("id", "btn_active");
                    btn.innerHTML = "ACTIVE";
                }
                btn.addEventListener("click", changeTableDisplay);
                btn_group.appendChild(btn);
            }
            btn_row.setAttribute("class", "row");
            btn_row.appendChild(btn_group);
            btn_contain.setAttribute("class", "container");
            btn_contain.appendChild(btn_row)
            footer.appendChild(btn_contain);
            APP.appendChild(footer);

        }
        
    }
    fetchLocalData();
}