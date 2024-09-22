import { TodoEntity } from "../../entities/todo.entity";
import { CreateTodoDto } from "../../dtos";
import { TodoRepository } from "../../repositories/todo.repository" 

// creamos la interfaz

export interface CreateTodoUseCase {
    execute( dto: CreateTodoDto ): Promise<TodoEntity>
}

export class CreateTodo implements CreateTodoUseCase {

    // recibe una inyeccion de dependencias
    constructor(
        private readonly repository: TodoRepository,
    ){}


    execute(dto: CreateTodoDto): Promise<TodoEntity> {
        return this.repository.create( dto );
    }

}
