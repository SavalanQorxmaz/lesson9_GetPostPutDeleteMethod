

const BASE_URL = "http://localhost:7000";

const person = document.getElementById("person");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const password = document.getElementById("password");
const create = document.getElementById("create")
const table = document.getElementById("table")
const change = document.querySelector(".change")


let idForUpdate = 0



    fetch(`${BASE_URL}/`, {
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
           
          
        })
       
       
    })


   

    
    create.addEventListener("click",() => {

        if((firstName.value.trim() == "") && (lastName.value.trim() == "") && (password.value.trim() == "")){
            swal ( "Oops" ,  "Bos olmaz!" ,  "error" )
        }else{

            const data = {
                id: Date.now(),
                firstName: firstName.value,
                lastName: lastName.value,
                password: password.value,
            };

 
            fetch(`${BASE_URL}/`, {
                method: "Post",
                headers: {
                    "Content-type": "application/json"
                },
               
                body: JSON.stringify(data)
            })
          
           
            location.reload()  
        }
   
    })
    
    

table.addEventListener("click", (e)=>{
   
        if(e.target.getAttribute("class") == "update"){

            idForUpdate = Number(e.target.parentNode.parentNode.children[0].innerHTML)
                change.children[0].value = e.target.parentNode.parentNode.children[1].innerHTML;
                change.children[1].value = e.target.parentNode.parentNode.children[2].innerHTML;
                change.children[2].value = e.target.parentNode.parentNode.children[3].innerHTML;
           change.classList.remove("hidden")
          
        }

        if(e.target.getAttribute("class") == "delete"){
            
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  
                  idForUpdate = Number(e.target.parentNode.parentNode.children[0].innerHTML);
                  fetch(`${BASE_URL}/${idForUpdate}`, {
                    method: "Delete",
                    headers: {
                        "Content-type" : "application/json"
                    },
                    
                })

                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                  });
                location.reload()

                } else {
                  swal("Your imaginary file is safe!");
                }
              });
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

        fetch(`${BASE_URL}/${idForUpdate}`, {
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

