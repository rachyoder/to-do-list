/* Page Layout */
let APP = document.getElementById("app");
APP.setAttribute("class", "container");

for (let i = 0; i < 4; i++) {
    if (i == 0) {
        let title_row = document.createElement("div");
        let title_col = document.createElement("div");
        title_row.setAttribute("class", "row");
        title_col.setAttribute("class", "col-12 display-4 text-center");
        title_col.innerHTML = "To-<span class='text-muted'>Dos</span>"
        title_row.appendChild(title_col);
        APP.appendChild(title_row);
    } else if (i == 1) {
        let input_row = document.createElement("div");
        let input_col = document.createElement("div");
        let input_text = document.createElement("input");

        input_row.setAttribute("class","row");
        input_col.setAttribute("class","col-12 mx-auto");
        input_text.setAttribute("class", "w-100");
        input_text.setAttribute("type", "text");
        input_text.setAttribute("id", "input_text");
        input_text.addEventListener("keydown", storeInput);
        input_col.appendChild(input_text);
        input_row.appendChild(input_col);
        APP.appendChild(input_row);
    }
}