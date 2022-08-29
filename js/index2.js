// const input = document.querySelector(".to-do-input");
// const addbtn = document.querySelector(".to-do-submit");
// const divcontainer = document.querySelector(".to-do-list-container");
// const alert = document.querySelector(".to-do");



//     eventlisteners()
//     function eventlisteners(){
//         addbtn.addEventListener("click",control);
//         document.addEventListener("DOMContentLoaded",AllloadInput);
        
//     }
//     function AllloadInput(){
//         let todos = getTodoFromStorage();
//         todos.forEach(element => {
            
//         });


//     }
//     function control(e){
//         const inputvalue = input.value.trim();
//         if( inputvalue === ""){
//             console.log("umut")
//             showalert("danger","please enter to do...");
//         }
//         else{
//             showalert("success","loaded succesfully");
//             addelement(inputvalue);
//             addTodoStorage(inputvalue);

//         }
//         e.preventDefault();
//     }
//     function getTodoFromStorage(){
//         let todos ;
//         if( localStorage.getItem("todos") === null ){
//             todos = [];
//         }
//         else{
//             todos = JSON.parse(localStorage.getItem("todos"));
//         }
//         return todos;
//     }
//     function addTodoStorage(inputvalue){
//         let todos = getTodoFromStorage();
//         todos.push(inputvalue);
//         localStorage.setItem("todos",JSON.stringify(todos));

//     }
//     function showalert(type,message){           // alert message
//             const div = document.createElement("div");
//             div.className = `alert alert-${type}`;
//             div.textContent = message;
//             alert.appendChild(div);
//             setTimeout(function(){
//             div.remove();
//                 },1500);
//     }


//     function addelement(inputvalue){                         //add item
//         let listdiv = document.createElement("div");
//         let listtitle = document.createElement("h6");
//         let listlink = document.createElement("a");
//         let listimg = document.createElement("img");
//         console.log("umut");
//         listdiv.className = "to-do-list";
//         listlink.className = "to-do-list-delete-link";
//         listimg.className = "to-do-list-delete-item";
//         listimg.src =   "/image/1200px-Grey_close_x.svg.png";
//         listtitle.appendChild(document.createTextNode(inputvalue));
//         divcontainer.appendChild(listdiv);
//         listdiv.appendChild(listtitle);
//         listdiv.appendChild(listlink);
//         listlink.appendChild(listimg);
//         console.log(listdiv);
//         input.value="";
//     }
let dizi = [1,2,3,4];
let dizi1 =[1,2,3,4];
Array.prototype.move = function (from,to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
  };
  dizi.move(1,3);
  console.log(dizi);

