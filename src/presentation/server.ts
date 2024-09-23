import express, { Router } from 'express';
import compression from 'compression';
import path from 'path';

interface Options {
    port: number;
    routes: Router;
    public_path: string;
}

export class Server {
    public readonly  app = express();
    private serverListener?: any;
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options:Options) {
        const { port, routes, public_path = 'public'} = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start() {

        //* middlewares     -> funciones que se ejecutan cuando pasan por una ruta
        this.app.use( express.json() );     //cualquier peticion que pase por mi app pasa por este middleware
        this.app.use( express.urlencoded({ extended: true })) // x-www-form-urlencoded
        this.app.use( compression() )

        //* Public Folder
        //this.app.use( express.static( 'public' ) );
        this.app.use( express.static( this.publicPath ) );

        //* Routes
        this.app.use( this.routes );

        /* this.app.get('/api/todos', (req, res)=> {
            res.json([
                { id: 1, text: 'Buy milk', createdAt: new Date() },
                { id: 2, text: 'Buy bread', createdAt: null },
                { id: 3, text: 'Buy butter', createdAt: new Date() },
            ])
        }) */



        //* SPA ayuda al router 
        this.app.get('*', (req,  res)=> {
            const indexPath = path.join(__dirname + `../../../${ this.publicPath }/index.html`)
            res.sendFile(indexPath);
        })

        this.serverListener =   this.app.listen( this.port , ()=> {
            console.log(`Server on running`, this.port )
        })
    }

    public close() {                    // metodo llamamos
        this.serverListener?.close();   // si tiene un valor .close
    }

}