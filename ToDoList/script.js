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

    // save data in local storage of user's browser
    saveData();
}

// enable user to cross out list item, or delete list item
// based on which element in the listContainer that they click
listContainer.addEventListener("click", function(event) {
    
    // if the clicked element is a <li> element, apply the CSS "checked" on that <li> element
    if(event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        saveData();
    }
    
    // else if the clicked element is a <span> element,
    // remove the parent element (<li> containing the task text and the delete icon) from the DOM
    else if(event.target.tagName === "SPAN") {
        event.target.parentElement.remove();
        saveData();
    }
}, false) 

// store to do list in local storage of user's browser
// so that if user refresh page, the list will remain
function saveData() {
    localStorage.setItem("todo-list-data", listContainer.innerHTML);
}

// function to display the saved data if user refresh the webpage
function showList() {
    listContainer.innerHTML = localStorage.getItem("todo-list-data");
}

// call the showList function
showList();