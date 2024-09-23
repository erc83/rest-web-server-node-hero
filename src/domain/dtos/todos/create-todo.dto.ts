
// puede ser un objeto o una clase

export class CreateTodoDto {
    constructor (
        public readonly text: string,
    ){}

    static create( props: {[key:string]: any}) : [string?, CreateTodoDto?] {
        const { text } = props;

        //validaciones
    if( !text || text.length === 0 ) return ['Text property is required', undefined];
    

        return [undefined, new CreateTodoDto(text)];
    }
}

