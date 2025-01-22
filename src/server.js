import http from "node:http"; // importando o módulo http do node

import {jsonHandler} from "./middlewares/jsonHandler.js" // importando o middleware jsonHandler

async function listener(request, response){
    await jsonHandler(request, response)
    console.log(request.body)
}

http.createServer(listener).listen(3334) // criando um servidor http na porta 3333