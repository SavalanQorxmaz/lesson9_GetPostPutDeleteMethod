

const BASE_URL = "http://localhost:7000";

const person = document.getElementById("person");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const password = document.getElementById("password");
const create = document.getElementById("create")
const table = document.getElementById("table")
const change = document.querySelector(".change")


let idForUpdate = 0


    fetch(`${BASE_URL}/get`, {
        method: "Get",
    })
    .then(res => {
        return res.json();
    })
    .then((json) => {
        json.data.map((data) => {
            table.innerHTML += `
            <tr><td>${data.id}</td>
            <td> ${data.firstName} </td>
                <td>${data.lastName}</td>
                <td>${data.password} </td>
                <td class="update-delete">
                    <button class="update" >Yenile</button>
                    <button class="delete">Sil</button>
                </td>
               
            </tr>`
           
            // console.log(json)

            // console.log(table)
        })
       
       
    })

    
    create.addEventListener("click",() => {
        const data = {
            id: Date.now(),
            firstName: firstName.value,
            lastName: lastName.value,
            password: password.value,
        };

        console.log(data)
            
        

        console.log(data)
    
        fetch(`${BASE_URL}/create`, {
            method: "Post",
            headers: {
                "Content-type": "application/json"
            },
           
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then((json)=> {
            location.reload();
            // console.log(json)
        })
       
        location.reload()  
    })
    
    

   

   



table.addEventListener("click", (e)=>{
   
        if(e.target.getAttribute("class") == "update"){

            idForUpdate = Number(e.target.parentNode.parentNode.children[0].innerHTML)
             
console.log(e.target.parentNode.parentNode.children[0])
                change.children[0].value = e.target.parentNode.parentNode.children[1].innerHTML;
                change.children[1].value = e.target.parentNode.parentNode.children[2].innerHTML;
                change.children[2].value = e.target.parentNode.parentNode.children[3].innerHTML;
           change.classList.remove("hidden")
          
        }
     
    
})


change.addEventListener("click", (e) => {
    if(e.target.id == "cancel"){
        change.classList.add("hidden")
    }

    if(e.target.id == "submit"){
        const data = {
            id: idForUpdate,
            firstName: change.children[0].value ,
            lastName: change.children[1].value,
            password: change.children[2].value,
        };

        fetch(`${BASE_URL}/update:${idForUpdate}`, {
            method: "Put",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify(data)
        })
        change.classList.add("hidden")
        location.reload()
    }
})

