

const BASE_URL = "http://localhost:7000";

const person = document.getElementById("person");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const password = document.getElementById("password");
const create = document.getElementById("create")
const table = document.getElementById("table")


let flag = 0;
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
            </tr>
            <tr>
                <td><span>${data.id}</span></td>
                <td>
                    <span>${data.firstName}</span>
                </td>
                <td>
                    <span>${data.lastName}</span>
                </td>
                <td>
                    <span>${data.password}</span>
                </td>
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
            
            firstName: firstName.value,
            lastName: lastName.value,
            password: password.value,
        };

        if(flag ==0){
            data.id = Date.now()
       
    
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
       
        
        }
        if(flag == 1){

            data.id = idForUpdate;

            create.innerText = "Daxil Et";

            fetch(`${BASE_URL}/update:${idForUpdate}`, {
                method: "Put",
                headers: {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            // .then(json => console.log(json))
        }
      
        
    })
    





table.addEventListener("click", (e)=>{
   
        if(e.target.getAttribute("class") == "update"){
            idForUpdate = Number(e.target.parentNode.parentNode.children[0].children[0].innerHTML);
            console.log(e.target.parentNode.parentNode)

            firstName.value = e.target.parentNode.parentNode.children[1].children[0].innerHTML;
            lastName.value = e.target.parentNode.parentNode.children[2].children[0].innerHTML;
            password.value = e.target.parentNode.parentNode.children[3].children[0].innerHTML
            flag = 1
            create.innerText = "Yenile"
        }
        else{

        }
    
})