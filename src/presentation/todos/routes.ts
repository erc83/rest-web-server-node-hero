import { Router } from "express";
import { TodosController } from "./controller";



export class TodoRoutes {

    static get routes(): Router {

        const router = Router();
        const todoController = new TodosController();

        //router.get('/', (req, res)=> todoController.getTodos(req, res) );
        // podemos mandar la referencia a la funcion
        router.get('/', todoController.getTodos );

        return router;
    }

}
