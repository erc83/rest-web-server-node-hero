import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository" 

// creamos la interfaz
export interface DeleteTodoUseCase {
    execute( id: number ): Promise<TodoEntity>
}

export class DeleteTodo implements DeleteTodoUseCase {

    // recibe una inyeccion de dependencias
    constructor(
        private readonly repository: TodoRepository,
    ){}


    execute( id: number ): Promise<TodoEntity> {
        return this.repository.deleteById( id );
    }

}
