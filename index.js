const http = require('http');

function router(handlers){
    return async function(request, response){
        const route = request.url.substring(1);

        let currentRouteHandler = handlers.get(route);
        if(!currentRouteHandler){
            return response.end("Resource not found");
        }
        
        return currentRouteHandler(request, response);
    }
}

class Server {
    constructor(){
        this.router = new Map();
    }

    route(routeName, routeHandler){
        this.router.set(routeName, routeHandler);
    }

    async start(port){
        const server = http.createServer(router(this.router));
        server.listen(port, ()=>{
            console.log(`server is listening on ${port}`)
        });
    }
    
}

let server = new Server();
server.route('ping', (req, res) => res.end("pong"));
server.route('pong', (req, res) => res.end("ping"));
server.start(3000);
