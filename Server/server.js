const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var cors = require("cors");
const { url } = require("inspector");
const port = 7000


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


const db = [];



app.get("/get", (req, res)=>{
    res.send({
        data:db
    })
})

app.post("/create", (req, res) =>{
    db.push(req.body);
    console.log(req.body)
})


app.put("/update:id", (req, res) => {
    const id = req.body.id;
    let userItem = db.findIndex((user) => {
        if(user.id == id){
            // db[userItem] = req.body;
            console.log(user)
        }
       
    })
    console.log(id)

})

app.delete("/delete:id", (req, res) => {
    const {id}= req.params.id;
    let userItem = db.findIndex((user) => {
        user.id == id;
        db[userItem] = req.body
    })
})



app.listen(port)