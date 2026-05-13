const express = require('express');
const app = express();
const server_functions = require('./server_functions')

require('dotenv').config();


const data = require('./data.json');
app.use(express.json()); // Linha para habilitar o uso de json (Express, estou usando JSON)
const PORT = process.env.PORT;

/* -=-=-=-=-=-=-=-=- Rotas Clients -=-=-=-=-=-=-=-=- */


app.get("/clients",
    function(req,res){
        res.json(data)
    }
)

app.get("/clients/:id",
    function(req,res){
        const { id } = req.params
        const client = data.find( user => user.id == id)
        if (!client){
            res.status(204).json()
        }
        res.json(client)
    }
)

app.post('/clients', function (req, res) {
  const newUser = server_functions.createUser(req.body);
  res.status(201).json(newUser);
});

app.put("/clients/id/:id",
    function(req,res){

    }
)

app.delete("/clients/id/:id",
    function(req,res){

    }
)



/* -=-=-=-=-=-=- Iniciando o servidor -=-=-=-=-=-=- */ 
app.listen(
    PORT,
    function(req,res){
        console.log(`Server is running in port: ${PORT}`)
    }
)
