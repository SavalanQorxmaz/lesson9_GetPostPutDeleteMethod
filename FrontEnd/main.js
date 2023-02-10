const BASE_URL = "http://localhost:9000";

document.querySelector("#register").addEventListener("click", () => {
  let name = document.querySelector("#name").value;
  let surname = document.querySelector("#surname").value;
  let password = document.querySelector("#password").value;

  let data = {
    id: Date.now(),
    name,
    surname,
    password,
  };
  fetch(`${BASE_URL}/create-data`, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.success == "OK") {
        document.querySelector("#name").value = "";
        document.querySelector("#surname").value = "";
        document.querySelector("#password").value = "";
        swal("Good job!", `${json.message}`, "success").then((willDelete) => {
          if (willDelete) {
            location.reload(true);
          }
        });
      }
    })
    .catch((error) => {
      swal("Neynedin e sen!", `Sehife tapilmadi sen cani duz yaz`, "error");
    });
});

fetch(`${BASE_URL}/get-data`)
  .then((res) => res.json())
  .then((json) => {
    json.data.map(
      (item) =>
        (document.querySelector("#customers").innerHTML += `
        <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.surname}</td>
        <td>${item.password}</td>
      </tr>
        `)
    );
  });

document.querySelector("#redirect").addEventListener("click", () => {
  console.log(location.pathname);
  location.pathname = "Users/faridyusifzada/Desktop/Form/detail.html";
});
