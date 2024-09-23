import { prisma } from '../../data/postgres'
import { CreateTodoDto, CustomError, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain"


export class TodoDatasourceImpl implements TodoDatasource {
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        return TodoEntity.fromObject( todo );
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        //return [];
        return todos.map( todo => TodoEntity.fromObject(todo) );
    }

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findUnique({
            where: {
                int: id
            }
        });  

        if( !todo ) throw new CustomError (`Todo with id ${id} not found`, 404);

        // Si existe
        return TodoEntity.fromObject(todo);
    }

    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        
        await this.findById( updateTodoDto.id);

        const updateTodo = await prisma.todo.update({
            where: {int : updateTodoDto.id },
            data: updateTodoDto!.values
        })
        
        return TodoEntity.fromObject(updateTodo);
    
    }

    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById( id);

        const deleted = await prisma.todo.delete({
            where : { int : id }
        });

        return TodoEntity.fromObject( deleted );

    }

}