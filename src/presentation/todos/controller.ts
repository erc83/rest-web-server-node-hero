import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos";


export class TodosController {

    //* DI
    constructor() {}

        public getTodos = async (req: Request, res: Response)=> {
            const todos = await prisma.todo.findMany()
            res.json(todos);
        }

        public getTodoById = async (req: Request, res: Response)=> {
            const id = +req.params.id;
            if( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number' });
            
            const todo = await prisma.todo.findUnique({
                where: {
                    int: id
                }
            });           
            
            ( todo )
                ? res.json(todo)
                : res.status(404).json({ error: `TODO with id ${ id } not found`})
        }

        public createTodo = async (req: Request, res: Response) => {
            const [error, createTodoDto] = CreateTodoDto.create(req.body);
            if (error) return res.status(400).json({ error });

            // obtener el body anteriormente
            //const { text } = req.body;
            //if( !text ) return res.status(400).json({ error: 'Text property is required' });

            const todo = await prisma.todo.create({
                data: createTodoDto!
            });

            res.json( todo );

        };

        public updateTodo = async (req: Request, res: Response) => {
            const id = +req.params.id; // viene con un texto se convierte con el +
            if( isNaN(id) ) return res.status( 400 ).json( { error: 'Id argument is not a number' } );

            const todo = await prisma.todo.findFirst({
                where : { int: id }
            })
            if( !todo ) return res.status( 404 ).json( { error: `Todo with id ${ id } not found` });
            
            const { text, completedAt } = req.body;
            const updateTodo = await prisma.todo.update({
                where: {int : id },
                data: { 
                    text, 
                    completedAt: (completedAt) ? new Date(completedAt) : null 
                }
            })
            
            res.json( updateTodo )
        }

        public deleteTodo = async (req: Request, res: Response ) => {
            const id = +req.params.id; // viene con un texto se convierte con el +
            if( isNaN(id) ) return res.status( 400 ).json( { error: 'Id argument is not a number' } );

            const todo = await prisma.todo.findUnique({
                where: {
                    int: id
                }
            });  

            if( !todo ) return res.status( 404 ).json({ error : `Todo with id ${ id } not found`})

            const deleted = await prisma.todo.delete({
                where : { int : id }
            });
            
            ( deleted )
                ? res.json( deleted )
                : res.status(400).json({ error: `Todo with id ${ id } not found `})

        }
}