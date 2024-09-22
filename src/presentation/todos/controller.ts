import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";


export class TodosController {

    //* DI
    constructor(
        private readonly todoRepository: TodoRepository, // mandamos el tipo de repository definido hay
    ) { }

        public getTodos = async (req: Request, res: Response)=> {
            const todos = await this.todoRepository.getAll();
            return res.json(todos);
        }

        public getTodoById = async (req: Request, res: Response)=> {
            const id = +req.params.id;
            
            try {
                const todo = await this.todoRepository.findById( id ); // si el id no existe puede fallar
                // si todo sale bien enviamos
                res.json( todo );

            } catch (error) {
                res.status(400).json({ error })
            }
            // puedo agregar mas validaciones
        }

        public createTodo = async (req: Request, res: Response) => {
            const [error, createTodoDto] = CreateTodoDto.create(req.body);
            if (error) return res.status(400).json({ error }); // si falla el DTO no es necesario continuar

            const todo = await this.todoRepository.create( createTodoDto! ) // signo de exclamacion porque se que lo tengo

            res.json( todo );
        };

        public updateTodo = async (req: Request, res: Response) => {
            const id = +req.params.id; // viene con un texto se convierte con el +
            const [error, updateTodoDto ] = UpdateTodoDto.create({
                ...req.body, id 
            })
            if( error ) return res.status(400).json({ error });

            const todo = await prisma.todo.findFirst({
                where : { int: id }
            })
            if( !todo ) return res.status( 404 ).json( { error: `Todo with id ${ id } not found` });
            
            // const { text, completedAt } = req.body;          -> no es necesario
            
            const updateTodo = await prisma.todo.update({
                where: {int : id },
                data: updateTodoDto!.values
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