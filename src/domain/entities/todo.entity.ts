
export class TodoEntity {

    constructor(
        public int: number,
        public text: string,
        public completedAt?: Date|null
    ){}

    get isCompleted() {
        return !!this.completedAt;      // Doble negacion si tien un valor regresa true
    }

    //metodo estatico fromObject, la mando el objeto y crea la entidad
    public static fromObject( object: {[key: string]: any} ): TodoEntity {      // TodoEntity valor de retorno
        const { int, text, completedAt } = object;
        if( !int ) throw 'Id is required'
        if( !text ) throw 'text is required'
        
        let newCompletedAt;

        if( completedAt ) {
            newCompletedAt = new Date(completedAt);
            if( isNaN( newCompletedAt.getTime() )) {
                throw 'CompletedAt is not a valid date'
            }
        }

        return new TodoEntity( int, text, completedAt )
    }
}

