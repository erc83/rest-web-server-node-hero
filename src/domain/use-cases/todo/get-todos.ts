import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository" 

// creamos la interfaz

export interface GetTodosUseCase {
    execute(): Promise<TodoEntity[]>
}

export class GetTodos implements GetTodosUseCase {

    // recibe una inyeccion de dependencias
    constructor(
        private readonly repository: TodoRepository,
    ){}


    execute( ): Promise<TodoEntity[]> {
        return this.repository.getAll();
    }

}
