import { TodoEntity } from "../entities/todo.entity";
import { CreateTodoDto, UpdateTodoDto } from "../dtos"

// puede ser tambien una interfaz
export abstract class TodoRepository {

    abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

    //todo: paginación
    abstract getAll(): Promise<TodoEntity[]>; 

    abstract findById( id: number ): Promise<TodoEntity>;
    
    abstract updateById( updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;

    abstract deleteById( id: number ): Promise<TodoEntity>;


}