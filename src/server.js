import http from "node:http"; // importando o módulo http do node

// importando o middleware
import {jsonHandler} from "./middlewares/jsonHandler.js" 
import { routeHandler } from "./middlewares/routeHandler.js";

async function listener(request, response){
    await jsonHandler(request, response)
    routeHandler(request, response)
}

http.createServer(listener).listen(3334) // criando um servidor http na porta 3334