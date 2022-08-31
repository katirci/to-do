// All item selected
const toDoAddingContainer = document.querySelector(".to-do");
const toDoAddingForm = document.querySelector(".to-do-form-container");
const toDoAddingInput = document.querySelector(".to-do-input");
const toDoContainer = document.querySelector (".to-do-list-container");
const toDoSearchInput = document.querySelector(".search-to-do-input");
const toDoDeleteAll = document.querySelector(".to-do-list-clear");
const toDo = document.querySelectorAll(".to-do-list");
const toDoAddingLocation = document.querySelector(".select-box-container");
const toDoSelectOption = document.querySelector("#order-select");

eventlisteners();
// All event
function eventlisteners() {
    toDoAddingForm.addEventListener("submit",toDoAdding);
    toDoSelectOption.addEventListener("click",addNumbersAsOption);
    document.addEventListener("DOMContentLoaded",toDoLoadStorage);
    document.addEventListener("click",toDoDelete);
    toDoSearchInput.addEventListener("keyup",toDoSearch);
    toDoDeleteAll.addEventListener("click",toDoClearAll);
    document.addEventListener("click",toDoMove);
}
function toDoMove(e) {
    // ToDo div replace to previous-element
    let toDoMoveUpDiv =e.target.parentElement.parentElement;
    let todos=toDoStorageGetToDo();
    let index = todos.indexOf(toDoMoveUpDiv.firstElementChild.textContent);
    Array.prototype.move = function (from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
    };
    if(e.target.className === "up-arrow") {
        toDoMoveUpDiv.parentElement.insertBefore(toDoMoveUpDiv,toDoMoveUpDiv.previousElementSibling);
        toDoMoveUpDiv.parentElement.insertBefore(toDoMoveUpDiv.previousElementSibling,toDoMoveUpDiv);
        todos.move(index,index-1);
    }
    // Todo div replace to next-element
    else if (e.target.className === "down-arrow") {
        toDoMoveUpDiv.parentElement.insertBefore(toDoMoveUpDiv,toDoMoveUpDiv.nextElementSibling);
        toDoMoveUpDiv.parentElement.insertBefore(toDoMoveUpDiv.nextElementSibling,toDoMoveUpDiv);
        todos.move(index,index+1);
    }
    localStorage.setItem("todos",JSON.stringify(todos));
}
// Option added to select input value
function addNumbersAsOption() {
    let inputToDo = toDoStorageGetToDo()
    let selectOption = document.querySelectorAll(".select-option-todo");
    for(let i =0;i<selectOption.length;i++){
        selectOption[i].remove();
    }
    for(let i=1;i<=inputToDo.length;i++) {
        const optionValue = document.createElement("option");
        optionValue.className = "select-option-todo";
        optionValue.textContent = i;
        toDoAddingLocation.appendChild(optionValue);
    }
}
// All Todo clear
function toDoClearAll(e) {
    if(confirm("tümünü silmek istediğinize emin misiniz?")) {
        while(toDoContainer.firstElementChild != null ){
            toDoContainer.removeChild(toDoContainer.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
     e.preventDefault();
}
// enter the keyword search see interested keyword Todo
function toDoSearch(e) {
    let toDoSearchValue =  e.target.value.toLowerCase();
    const listitem = document.querySelectorAll(".to-do-list");
    const toDolink = document.querySelectorAll(".to-do-list-delete-link");
    const toDoArrowMenu = document.querySelectorAll(".move-menu");
    console.log(toDoSearchValue);
    if(toDoSearchValue === "") {
        toDoArrowMenu.forEach(function (element) {
            element.style.display = "block";
        })
        toDolink.forEach(function (element) {
            element.style.display = "block";
        });
    }
    else {
        toDolink.forEach(function (element) {
            element.style.display= "none";
        });
        toDoArrowMenu.forEach(function (element) {
            element.style.display = "none";
        })
        listitem.forEach(function (listitem) {
            const text = listitem.textContent.toLocaleLowerCase();
            if (text.indexOf(toDoSearchValue) === -1) {
                listitem.setAttribute("style", "display : none");
            } else {
                listitem.setAttribute("style", "display : flex");
            }
        });
    }
}
// be useful toDoDelete delete to Todo
function toDoDelete(e) {
    if(e.target.className === "to-do-list-delete-link"){    
        e.target.parentElement.remove();
        deleteStorage(e.target.parentElement.textContent);
        showAlert("success","To do basarıyla silindi");
    }
}
// be useful delete storageitem
function deleteStorage(deleteToDo) {
    let todos = toDoStorageGetToDo();
    todos.forEach(function(todo,index) {
        if (todo === deleteToDo) {
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}
// load storage item
function toDoLoadStorage() {
    let todos = toDoStorageGetToDo();
    todos.forEach(function(todo){   
        toDoAddingInputLocation(todo, '');         
    });
}
// enter the Todo compare enter the last Todo
function toDoCompare(inputValue) {
    let todos = toDoStorageGetToDo();
    let isSameValueExist = false;
    todos.forEach(function(todo) {
        if(inputValue === todo) {
            isSameValueExist = true;
        }          
    });
    return isSameValueExist;
}
// input value check and show aler
function toDoAdding(e){
    const toDoAddingInputValue = toDoAddingInput.value.trim();
    if( toDoAddingInputValue === "") {
        showAlert("danger","please enter the to do...");
    }
    else if(toDoCompare(toDoAddingInputValue)) {
        showAlert("danger","plase enter the different to do ...");
    }
    else {
        const selectedOrder = document.getElementById('order-select').value;
        toDoAddingInputLocation(toDoAddingInputValue, selectedOrder);
        showAlert("success","thank your to do message");
        toDoAddStorage(toDoAddingInputValue,selectedOrder);
    }
    e.preventDefault();
} 
//  be useful take storage item
function toDoStorageGetToDo() {
    let todos;
    if(localStorage.getItem("todos") === null ) {
        todos = [];
    }
    else{
        todos =JSON.parse(localStorage.getItem("todos"))
    }
    return todos;
}
// enter the inputvalue addin storageitem
function toDoAddStorage(toDoAddingInputValue,selectedOrder) {
    let todos = toDoStorageGetToDo();
    if( selectedOrder === ""){
        todos.push(toDoAddingInputValue);
    }
    else{
        todos.splice(selectedOrder,0,toDoAddingInputValue);
    }
    localStorage.setItem("todos",JSON.stringify(todos));
}
// if enter the value,showalert success,danger
function showAlert(type,message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    toDoAddingContainer.appendChild(alert);
    setTimeout(function() { // ı can see 1.5 second use to settimeout
        alert.remove();
    },1500);
}
// Page addin input find location in the page
function toDoAddingInputLocation(toDoAddingInputValue, selectedOrder) {
    const toDo= document.createElement("div");
    const toDoText = document.createElement("h6");
    const toDoLink = document.createElement("a");
    const toDoIcon = document.createElement("img");
    const moveUp = document.createElement("img");
    const moveDown = document.createElement("img");
    const moveMenu = document.createElement("div");
    toDoIcon.className = ("to-do-list-delete-item");
    toDoIcon.src = ("./image/1200px-Grey_close_x.svg.png");
    toDoLink.className = ("to-do-list-delete-link");
    moveMenu.className = ("move-menu");
    moveUp.src = "./image/png-transparent-black-arrow-up-illustration-arrow-desktop-symbol-up-arrow-angle-triangle-sign-thumbnail.png";
    moveDown.src = "./image/free-down-arrow-icon-png-vector-716101.png";
    moveUp.className = "up-arrow";
    moveDown.className = "down-arrow";
    toDoLink.href = ("javascript:void(0)");
    toDo.className = ("to-do-list");
    toDoText.appendChild(document.createTextNode(toDoAddingInputValue));
    toDo.appendChild(toDoText);
    toDo.appendChild(moveMenu);
    toDo.appendChild(toDoLink);
    toDoLink.appendChild(toDoIcon);
    moveMenu.appendChild(moveUp);
    moveMenu.appendChild(moveDown);
    if(selectedOrder === '') {
        toDoContainer.appendChild(toDo);
    } 
    else {
        toDoContainer.insertBefore(toDo, document.querySelector (`.to-do-list-container .to-do-list:nth-child(${selectedOrder})`));
    }
    toDoAddingInput.value = "";
}