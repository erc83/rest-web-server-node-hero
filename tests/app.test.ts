
import { envs } from '../src/config/envs'
import { AppRoutes } from '../src/presentation/routes'
import { Server } from '../src/presentation/server'

// todo lo que esta en esta ruta es un mock 
jest.mock('../src/presentation/server')

describe('should call server with arguments and start', () => {

    test('should work', async () => { 
        
        await import('../src/app')

        expect(Server).toHaveBeenCalledTimes(1);

        // evaluamos que sea llamado con tales argumentos
        expect( Server ).toHaveBeenCalledWith({
            port: envs.PORT,
            public_path: envs.PUBLIC_PATH,
            //routes: AppRoutes.routes       //esta llamando a dos lugares diferentes por eso no usamos el AppRoutes
            routes: expect.any(Function),
        })

        // esperamos que el server.start() ha sido llamado
        //expect(Server.prototype.start).toHaveBeenCalledWith({
        //    a:1
        //})
        expect(Server.prototype.start).toHaveBeenCalledWith()

    })

})