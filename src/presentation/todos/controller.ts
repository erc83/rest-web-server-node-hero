import { create } from "domain";
import { Request, Response } from "express"
import { prisma } from "../../data/postgres";

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
            if( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number' });
            const todo = todos.find( todo => todo.id === id );
            ( todo )
                ? res.json(todo)
                : res.status(404).json({ error: `TODO with id ${ id } not found`})
        }

        public createTodo = async (req: Request, res: Response) => {
            // obtener el body
            const { text } = req.body;
            if( !text ) return res.status(400).json({ error: 'Text property is required' });

            const todo = await prisma.todo.create({
                data: { text : text }
            })

            res.json( todo );

        };

        public updateTodo = (req: Request, res: Response) => {
            const id = +req.params.id; // viene con un texto se convierte con el +
            if( isNaN(id) ) return res.status( 400 ).json( { error: 'Id argument is not a number' } );

            const todo = todos.find( todo => todo.id === id );
            if( !todo ) return res.status( 404 ).json( { error: `Todo with id ${ id } not found` });

            const { text, createdAt } = req.body;
            //if( !text ) return res.status( 400 ).json( {error: 'Text property is required' });

            todo.text = text || todo.text; // va a ser el texto si viene si no va a ser el mismo valor
            ( createdAt === 'null')
                ? todo.createdAt = null
                : todo.createdAt = new Date( createdAt || todo.createdAt );

            res.json( todo )
        }

        public deleteTodo = (req: Request, res: Response ) => {
            const id = +req.params.id; // viene con un texto se convierte con el +
            if( isNaN(id) ) return res.status( 400 ).json( { error: 'Id argument is not a number' } );

            const todo = todos.find(todo => todo.id === id );
            if( !todo ) return res.status( 404 ).json({ error : `Todo with id ${ id } not found`})

            todos.splice( todos.indexOf( todo ), 1 ); // tambien se puede realizar con un filter

            res.json( todo );
        }
}