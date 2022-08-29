// All item selected
const adderform = document.querySelector(".to-do-form-container");
const adderinput = document.querySelector(".to-do-input");
const todolist = document.querySelector (".to-do-list-container");
const todocontainer = document.querySelector(".to-do");
const searchcontainer = document.querySelector(".search-to-do-container");
const search = document.querySelector(".search-to-do-input");
const clearbutton = document.querySelector(".to-do-list-clear");
const deletebutton = document.querySelectorAll(".to-do-list-delete-link");


eventlisteners();
function eventlisteners(){
    adderform.addEventListener("submit",addlist);
     document.addEventListener("DOMContentLoaded",loadtodos);
     document.addEventListener("click",deleteitem);
      search.addEventListener("keyup",filterTodos);
     clearbutton.addEventListener("click",clearAllTodos);

}
function clearAllTodos(e){          // bütün list itemlerini siliyor
    if(confirm("tümünü silmek istediğinize emin misiniz?")){
        while(todolist.firstElementChild != null ){
            todolist.removeChild(todolist.firstElementChild);
        }
        localStorage.removeItem("todos");


    }

     e.preventDefault();
 }
function filterTodos(e){                        // kalvyeden girilen değere göre list itemlarımızı sıralıyor
    let filterValue =  e.target.value.toLowerCase(); 
    const listitem = document.querySelectorAll(".to-do-list");
    listitem.forEach(function(listitem){
            const text = listitem.textContent.toLocaleLowerCase();
            if(text.indexOf(filterValue) === -1){
                listitem.setAttribute("style","display : none");
            }
            else{
                listitem.setAttribute("style","display : flex");
            }

    });
}
function deleteitem(e){                     // yüklediğimiz list itemleri silemmize yarıyor
    if(e.target.className === "to-do-list-delete-link"){    
        e.target.parentElement.remove();
        deleteStorage(e.target.parentElement.textContent);
        showalert("success","To do basarıyla silindi");
    }
    
}
function deleteStorage(deletetodo){   // storagedan input değerlerimizi silmek için
    let todos = storagegetitem();
    todos.forEach(function(todo,index){
        if (todo === deletetodo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}



// }
function loadtodos(){
    let todos = storagegetitem();
    todos.forEach(function(todo){
        addpage(todo);
    })


}
    function addlist(e){
        const newlist = adderinput.value.trim();
        if( newlist === ""){
            showalert("danger","please enter the to do...");
        }
        else{
        addpage(newlist);
            showalert("success","thank your to do message");
             addstorage(newlist);
        }
        e.preventDefault();
    }   

    function storagegetitem(){         // storageden todoları almamıza yarıyor
        let todos;
        if(localStorage.getItem("todos") === null ){
            todos = [];
        }
        else{
            todos =JSON.parse(localStorage.getItem("todos"))
        }
        return todos;
    }
    function addstorage(newlist){               
        let todos = storagegetitem();
        todos.push(newlist);
        localStorage.setItem("todos",JSON.stringify(todos));

    }
    function showalert(type,message){ // input değerinin girilip girilmediği için

        const alert = document.createElement("div");
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        todocontainer.appendChild(alert);
        setTimeout(function(){      // 1.5 saniye ekranda gözükmesi için alınan fonksiyon
            alert.remove();
        },1500);

    }
    function addpage(newlist){          // Sayfada girilen input değerlerinin yerini belli etmek için
        const listcontainer= document.createElement("div");
        const listtitle = document.createElement("h6");
        const listlink = document.createElement("a");
        const listimg = document.createElement("img");
        listimg.className = ("to-do-list-delete-item");
        listimg.src = ("/image/1200px-Grey_close_x.svg.png");
        listlink.className = ("to-do-list-delete-link");
        listlink.href = ("#");
        listcontainer.className = ("to-do-list");
        listtitle.appendChild(document.createTextNode(newlist));
        todolist.appendChild(listcontainer);
        listcontainer.appendChild(listtitle);
        listcontainer.appendChild(listlink);
        listlink.appendChild(listimg);
        adderinput.value = "";
        
    }
