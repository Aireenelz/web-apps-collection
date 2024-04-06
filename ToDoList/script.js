// to do list app

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// add the task to local storage when user click "add" button
function addTask() {
    if(inputBox.value === "") {
        alert("Please add a task :3");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        // add a delete icon next to the list item
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }

    // clear input field after user clicked "add" button
    inputBox.value = "";
}