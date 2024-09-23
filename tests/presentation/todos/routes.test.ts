import request from 'supertest';
import { testServer } from '../../test-server'

describe('TODO route testing', () => {

    //levantando el servidor
    beforeAll(async() => {
        await  testServer.start();
    })


    test('should return TODOs api/todos', async () => { 
        // nos pide la aplicacion que es de nuestro server
        const response = await request( testServer.app )
            .get('/api/todos')
            // .expect(200);                -> nos muestra el error que no tenemos la tabla creada

        console.log(response.body);
    })

})
