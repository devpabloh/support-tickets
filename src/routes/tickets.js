export const tickets = [
    {
        method: "GET",
        path: "/tickets",
        controller: (request, response)=>{
            response.end("criado com sucesso")
        }
    }
]