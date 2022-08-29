// All item selected
const toDoAddingContainer = document.querySelector(".to-do");
const toDoAddingForm = document.querySelector(".to-do-form-container");
const toDoAddingInput = document.querySelector(".to-do-input");
const toDoContainer = document.querySelector (".to-do-list-container");
const toDoSearchInput = document.querySelector(".search-to-do-input");
const toDoDeleteAll = document.querySelector(".to-do-list-clear");
const toDo = document.querySelectorAll(".to-do-list");
const toDoAddingLocation = document.querySelector(".select-box-container");

eventlisteners();

function eventlisteners(){                              // All event 
    toDoAddingForm.addEventListener("submit",toDoAdding);
    document.addEventListener("DOMContentLoaded",addNumbersAsOption);
    document.addEventListener("DOMContentLoaded",toDoLoadStorage);
    document.addEventListener("click",toDoDelete);
    toDoSearchInput.addEventListener("keyup",toDoSearch);
    toDoDeleteAll.addEventListener("click",toDoClearAll);
    document.addEventListener("click",toDoMoveDown);
    document.addEventListener("click",toDoMoveUp);
}
function toDoMoveUp(e){                                 // To Do Move Up 
    if(e.target.className === "up-arrow"){
        let toDoMoveUpDiv =e.target.parentElement.parentElement;
        toDoMoveUpDiv.parentElement.insertBefore(toDoMoveUpDiv,toDoMoveUpDiv.previousElementSibling);
        toDoMoveUpDiv.parentElement.insertBefore(toDoMoveUpDiv.previousElementSibling,toDoMoveUpDiv);
        let todos=toDoStorageGetInput();
        let index = todos.indexOf(toDoMoveUpDiv.firstElementChild.textContent);
        let index1 = index - 1;
        Array.prototype.move = function (from, to) {
            this.splice(to, 0, this.splice(from, 1)[0]);
        };
        todos.move(index,index1);
        localStorage.setItem("todos",JSON.stringify(todos));
    }
}
function addNumbersAsOption(){                          // select>option Value Adding 
    let inputToDo = toDoStorageGetInput();
    let numberOfToDo = inputToDo.length;
    console.log(numberOfToDo)
    for(i=1;i<=numberOfToDo;i++) {
        const optionValue = document.createElement("option");
        optionValue.textContent = i;
        toDoAddingLocation.appendChild(optionValue);
    }
}
function toDoMoveDown(e) {
    if(e.target.className === "down-arrow"){             // To Do Div Move Down
        let toDoMoveDownDiv = e.target.parentElement.parentElement;
        toDoMoveDownDiv.parentElement.insertBefore(toDoMoveDownDiv,toDoMoveDownDiv.nextElementSibling);
        toDoMoveDownDiv.parentElement.insertBefore(toDoMoveDownDiv.nextElementSibling,toDoMoveDownDiv);
        console.log(toDoMoveDownDiv.firstElementChild.textContent);
        let todos=toDoStorageGetInput();
        let index = todos.indexOf(toDoMoveDownDiv.firstElementChild.textContent);
        let index1 = index+1;
        Array.prototype.move = function (from, to) {
            this.splice(to, 0, this.splice(from, 1)[0]);
        };
        todos.move(index,index1);  
        localStorage.setItem("todos",JSON.stringify(todos));
    }
}

function toDoClearAll(e){                            // all To Do Clear 
    if(confirm("tümünü silmek istediğinize emin misiniz?")){
        while(toDoContainer.firstElementChild != null ){
            toDoContainer.removeChild(toDoContainer.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
     e.preventDefault();
 }
function toDoSearch(e){                        // kalvyeden girilen değere göre list itemlarımızı sıralıyor
    let toDoSearchValue =  e.target.value.toLowerCase(); 
    const listitem = document.querySelectorAll(".to-do-list");
    listitem.forEach(function(listitem){
        const text = listitem.textContent.toLocaleLowerCase();
        if(text.indexOf(toDoSearchValue) === -1){
            listitem.setAttribute("style","display : none");
        }
        else{
            listitem.setAttribute("style","display : flex");
        }
    });
}
function toDoDelete(e){                     // yüklediğimiz list itemleri silemmize yarıyor
    if(e.target.className === "to-do-list-delete-link"){    
        e.target.parentElement.remove();
        deleteStorage(e.target.parentElement.textContent);
        showalert("success","To do basarıyla silindi");
    }
}
function deleteStorage(deletetodo){   // storagedan input değerlerimizi silmek için
    let todos = toDoStorageGetInput();
    todos.forEach(function(todo,index){
        if (todo === deletetodo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}
function toDoLoadStorage(){           
    let todos = toDoStorageGetInput();
    console.log(todos);
    todos.forEach(function(todo){   
        toDoAddingInputLocation(todo, '');         
    });
}
function toDoCompare(inputValue){
    let todos = toDoStorageGetInput();
    let isSameValueExist = false;
    todos.forEach(function(todo){
        if(inputValue === todo){
            isSameValueExist = true;
        }          
    });
    return isSameValueExist;
}
    function toDoAdding(e){                                         // input value check = blank,check different input value
        const toDoAddingInputValue = toDoAddingInput.value.trim();
        if( toDoAddingInputValue === ""){
            showalert("danger","please enter the to do...");
        }
        else if(toDoCompare(toDoAddingInputValue)) {
            showalert("danger","plase enter the different to do ...");
        }
        else{
            const selectedOrder = document.getElementById('order-select').value;
            toDoAddingInputLocation(toDoAddingInputValue, selectedOrder);
            showalert("success","thank your to do message");
            toDoAddStorage(toDoAddingInputValue,selectedOrder);
        }
        e.preventDefault();
    }   
    function toDoStorageGetInput(){                                  // storageden todoları almamıza yarıyor
        let todos;
        if(localStorage.getItem("todos") === null ){
            todos = [];
        }
        else{
            todos =JSON.parse(localStorage.getItem("todos"))
        }
        return todos;
    }
    function toDoAddStorage(toDoAddingInputValue,selectedOrder){          // enter the input value adding storage     
        let todos = toDoStorageGetInput();
        if( selectedOrder === ""){
            todos.push(toDoAddingInputValue);
        }
        else{
            todos.splice(selectedOrder,0,toDoAddingInputValue);
        }
        localStorage.setItem("todos",JSON.stringify(todos));
    }
    function showalert(type,message){                               // if enter the value, screen show success,danger
        const alert = document.createElement("div");
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        toDoAddingContainer.appendChild(alert);
        setTimeout(function(){                                      // ı can see 1.5 second use to settimeout
            alert.remove();
        },1500);
    }
    function toDoAddingInputLocation(toDoAddingInputValue, selectedOrder){          // Page addin input find location in the page
        const toDo= document.createElement("div");
        const toDoText = document.createElement("h6");
        const toDoLink = document.createElement("a");
        const toDoIcon = document.createElement("img");
        const moveUp = document.createElement("img");
        const moveDown = document.createElement("img");
        const moveMenu = document.createElement("div");
        toDoIcon.className = ("to-do-list-delete-item");
        toDoIcon.src = ("/image/1200px-Grey_close_x.svg.png");
        toDoLink.className = ("to-do-list-delete-link");
        moveUp.src = "/image/png-transparent-black-arrow-up-illustration-arrow-desktop-symbol-up-arrow-angle-triangle-sign-thumbnail.png";
        moveDown.src = "/image/free-down-arrow-icon-png-vector-716101.png";
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
        else{
            toDoContainer.insertBefore(toDo, document.querySelector (`.to-do-list-container .to-do-list:nth-child(${selectedOrder})`));
        }
        toDoAddingInput.value = "";
    }