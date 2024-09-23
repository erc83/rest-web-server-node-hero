import request from 'supertest';
import { testServer } from '../../test-server'
import { after } from 'node:test';

describe('TODO route testing', () => {

    //levantando el servidor
    beforeAll(async() => {          // Antes de todas las pruebas
        await  testServer.start();
    })

    afterAll(() => {                // despues de todas las pruebas
        testServer.close()
    })

    test('should return TODOs api/todos', async () => { 
        // nos pide la aplicacion que es de nuestro server
        const response = await request( testServer.app )
            .get('/api/todos')
            .expect(200);               //  -> nos muestra el error que no tenemos la tabla creada

        console.log(response.body);
    })

})
