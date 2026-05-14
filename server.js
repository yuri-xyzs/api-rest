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
            res.status(204).json({result : 'User not found'})
        }
        res.json(client)
    }
)

app.post('/clients', function (req, res) {
    const newUser = server_functions.createUser(req.body);
    res.status(200).json(newUser);
});

app.put("/clients/id/:id",
    function(req,res){
    const { id } = req.params
    const  newUser  = req.body
    console.log(`newUser: ${newUser}\n\n<- <-`)
    const Older = data.find(user => user.id == id)
    console.log(`Older: ${Older}\n\n<- <-`)
    if (!Older){
        res.status(204).json({result : 'User not found'})
    }
    const result = server_functions.alterUser(Older, newUser)
    res.status(200).json(result)
    
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
