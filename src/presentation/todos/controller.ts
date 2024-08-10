import { Request, Response } from "express"

const todos = [
    { id: 1, text: 'Buy milk', createdAt: new Date() },
    { id: 2, text: 'Buy bread', createdAt: null },
    { id: 3, text: 'Buy butter', createdAt: new Date() },
];


export class TodosController {

    //* DI
    constructor() {}

        public getTodos = (req: Request, res: Response)=> {
            res.json(todos);
        }

        public getTodoById = (req: Request, res: Response)=> {
            const id = +req.params.id;
            // console.log(id, 10);
            //res.json({id});
            const todo = todos.find( todo => todo.id === id );
            res.json(todo)

        }
}