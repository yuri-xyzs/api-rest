const express = require('express');
const app = express();
const server_functions = require('./server_functions')

require('dotenv').config();
const erros = {
    user_not_found : {result : 'User not found'},
    internal_error : { result : 'Internal server error' }
}
const data = require('./data.json');
app.use(express.json()); // Linha para habilitar o uso de json (Express, estou usando JSON)
const PORT = process.env.PORT;

/* -=-=-=-=-=-=-=-=- Rotas Clients -=-=-=-=-=-=-=-=- */


app.get("/clients",
    function(req,res){
        const users = server_functions.userFindAll()
        res.json(users)
    }
)

app.get("/clients/:id",
    function(req,res){
        const { id } = req.params
        const client = data.find( user => user.id == id)
        if (!client){
            res.status(404).json({result : 'User not found'})
        }
    console.log(`Req feita: 
ID selecionado: ${req.params.id || 'no ID'}`)
        res.json(client)
    }
)

app.post('/clients', function (req, res) {
    const newUser = server_functions.userCreate(req.body);
    res.status(201).json(newUser);
});

app.put("/clients/id/:id",
    function(req,res){
    const { id } = req.params
    const  newUser  = req.body
    const Older = data.find(user => user.id == id)
    if (!Older){
        res.status(404).json(erros.user_not_found)
    }
    const result = server_functions.userUpdateById(Older, newUser)
    res.status(200).json(result)
    
}
)

app.delete("/clients/id/:id", function(req, res){
    const { id } = req.params
    
    const result = server_functions.userDeleteById(id)
    switch (result?.status){
            
        case 'not_found':
            res.status(404).json(erros.user_not_found)
            break;

        case 'invalid_id':
            res.status(400).json({
                error: 'Invalid ID'
            })
            break;

        case 'user_deleted':
            res.status(200).json({
                result: "User deleted",
                user: result?.user
            })

            break;
        default:
            res.status(500).json(erros.internal_error)
    }

})



/* -=-=-=-=-=-=- Iniciando o servidor -=-=-=-=-=-=- */ 
app.listen(
    PORT,
    function(req,res){
        console.log(`Server is running in port: ${PORT}`)
    }
)
