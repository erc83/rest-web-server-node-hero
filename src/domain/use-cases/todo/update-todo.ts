import { TodoEntity } from "../../entities/todo.entity";
import { UpdateTodoDto } from "../../dtos";
import { TodoRepository } from "../../repositories/todo.repository" 

// creamos la interfaz

export interface UpdateTodoUseCase {
    execute( dto: UpdateTodoDto ): Promise<TodoEntity>
}

export class UpdateTodo implements UpdateTodoUseCase {

    // recibe una inyeccion de dependencias
    constructor(
        private readonly repository: TodoRepository,
    ){}


    execute(dto: UpdateTodoDto): Promise<TodoEntity> {
        return this.repository.updateById( dto );
    }

}
