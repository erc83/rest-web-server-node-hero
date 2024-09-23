import request from 'supertest';
import { testServer } from '../../test-server'
import { prisma } from '../../../src/data/postgres';

describe('TODO route testing', () => {

    //levantando el servidor
    beforeAll(async() => {          // Antes de todas las pruebas
        await  testServer.start();
    }) 

    afterAll(() => {                // despues de todas las pruebas
        testServer.close()
    })

    beforeEach(async () => {
        await prisma.todo.deleteMany(); 
    })

    const todo1 = { text: 'Hola mundo test 1' };
    const todo2 = { text: 'Hola mundo test 2' };


    test('should return TODOs api/todos', async () => { 
        //cuando se ejecute esta prueba comience de 0 las inserciones
        await prisma.todo.deleteMany();

        await prisma.todo.createMany({
            data: [ todo1, todo2 ]
        })

        // nos pide la aplicacion que es de nuestro server
        const response = await request( testServer.app )
            .get('/api/todos')
            .expect(200);               //  -> nos muestra el error que no tenemos la tabla creada

        //console.log(response.body);
        expect( response.body ).toBeInstanceOf( Array );
        expect( response.body.length ).toBe(2);
        expect( response.body[0].text).toBe( todo1.text )
        expect( response.body[1].text).toBe( todo2.text )

        expect( response.body[0].completedAt).toBeNull();
    })

    test('should return a TODO api/todos/:id', async () => { 

        const todo = await prisma.todo.create({
            data: todo1
        });

        // nos pide la aplicacion que es de nuestro server
        const response = await request( testServer.app )
            .get(`/api/todos/${ todo.int }`)
            .expect(200);   

        expect( response.body ).toEqual({
            int: todo.int,
            text: todo.text,
            completedAt: todo.completedAt
        })
    })

    test('should return a 404 Not Found api/todos/:id', async () => { 
        //await prisma.todo.delete({ where: { int:9999 }})

        const todoId = 999
        // nos pide la aplicacion que es de nuestro server
        const response = await request( testServer.app )
            .get(`/api/todos/${ todoId }`)                        
            .expect(400);   

        // console.log( response.body )
        expect( response.body ).toEqual({ error: `Todo with id ${ todoId} not found` })
    })

    test('should return a new TODO api/todos', async () => {  
        const response = await request( testServer.app )
            .post('/api/todos')
            .send( todo1 ) 
            .expect(201)
        // console.log(response.body)
        expect( response.body ).toEqual({
            int: expect.any(Number),
            text: todo1.text,
            completedAt: null
        })
    })

    test('should return an error if text is present api/todos', async () => {  
        const response = await request( testServer.app )
            .post('/api/todos')
            .send( { } ) 
            .expect( 400 )
        // console.log(response.body)
        expect( response.body ).toEqual({ error: 'Text property is required' })
    })

    test('should return an error if text is empty api/todos', async () => {  
        const response = await request( testServer.app )
            .post('/api/todos')
            .send( {text:''} ) 
            .expect( 400 )
        // console.log(response.body)
        expect( response.body ).toEqual({ error: 'Text property is required' })
    })


    test('should return an updated TODO api/todos/:id', async () => {  

        const todo = await prisma.todo.create({data: todo1 }) // nos aseguramos de que exista

        const response = await request( testServer.app )
            .put(`/api/todos/${ todo.int }`)
            .send( { text: 'Hola mundo UPDATE', completedAt: '2023-10-21' }) 
            .expect( 200 )
        //console.log(response.body)
        expect( response.body ).toEqual({
            int: expect.any(Number),                    // no puedo decirle un numero en especifico
            text: 'Hola mundo UPDATE',
            completedAt: '2023-10-21T00:00:00.000Z'
        })
    })

})
