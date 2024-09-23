import { Request, Response } from "express"
//import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { CustomError, TodoRepository } from "../../domain";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, UpdateTodo } from "../../domain/use-cases/todo";


export class TodosController {

    //* DI
    constructor(
        private readonly todoRepository: TodoRepository, // mandamos el tipo de repository definido hay
    ) { }

        public getTodos = (req: Request, res: Response)=> {
            
            new GetTodos( this.todoRepository )
                .execute()
                .then( todos => res.json(todos) )
                .catch( error => res.status(400).json({ error }) );
        }

        public getTodoById = (req: Request, res: Response)=> {
            const id = +req.params.id;
            
            new GetTodo( this.todoRepository )
                .execute( id )
                .then( todo => res.json( todo ))
                //.catch( error => res.status(400).json({ error }));
                .catch( (error: CustomError ) => res.status( error.statusCode ).json({ error: error.message }));
        }

        public createTodo = (req: Request, res: Response) => {
            const [error, createTodoDto] = CreateTodoDto.create(req.body);
            if (error) return res.status(400).json({ error }); // si falla el DTO no es necesario continuar

            new CreateTodo( this.todoRepository )
                .execute( createTodoDto! )
                .then(todo => res.status(201).json( todo ))
                .catch( error => res.status( 400 ).json({ error }))
        };  

        public updateTodo = (req: Request, res: Response) => {
            const id = +req.params.id; // viene con un texto se convierte con el +
            const [error, updateTodoDto ] = UpdateTodoDto.create({
                ...req.body, id           // aqui usamos el id del parametro por si en el body lo envian lo sobreescribe
            })
            if( error ) return res.status(400).json({ error });

            new UpdateTodo( this.todoRepository )
                .execute( updateTodoDto! )
                .then( todo => res.json( todo ))
                .catch( error => res.status( 400 ).json({ error }))
        }

        public deleteTodo = (req: Request, res: Response ) => {
            const id = +req.params.id; // viene con un texto se convierte con el +
            if( isNaN(id) ) return res.status( 400 ).json( { error: 'Id argument is not a number' } );

            new DeleteTodo( this.todoRepository )
                .execute( id )
                .then(todo => res.json( todo ) )
                .catch( error => res.status( 400 ).json({ error })) 
        }
}