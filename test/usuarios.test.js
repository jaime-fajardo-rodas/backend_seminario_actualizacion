const request = require('supertest')

const Server = require('../models/server');
const path = require('path');

require("dotenv").config("./.env")

const server = new Server();
let tokenObtenido = '';
let uidUsuarioTemp = '';

describe('POST /auth/login', () => {
    test('logueo de usuario', async () => {

        const response = await request(server.app)
            .post('/api/auth/login')
            .send({
                correo: 'admin1@gmail.com',
                contrasena: '123456'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        let { usuario, token } = response.body;
        tokenObtenido = token;
        expect(usuario).toEqual(
            expect.objectContaining({ nombres: 'admin1', apellidos: 'apellidos1' }),
        );
    })
})

describe('POST /usuarios/', () => {
    test('Crear usuario', async () => {

        const response = await request(server.app)
            .post('/api/usuarios/')
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .send({
                nombres: 'admin2',
                apellidos: 'apellidos2',
                correo: 'admin2@gmail.com',
                contrasena: '123456'
                
            })
            .expect('Content-Type', /json/)
            .expect(200);

        let { usuario } = response.body;
        uidUsuarioTemp = usuario.uid;
        expect(usuario).toEqual(
            expect.objectContaining({ correo: 'admin2@gmail.com', uid: uidUsuarioTemp }),
        )
    })
})

describe('POST /usuarios/', () => {
    test('GetById Usuario', async () => {

        const response = await request(server.app)
            .get(`/api/usuarios/${uidUsuarioTemp}`)
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        let { usuario } = response.body;
        expect(usuario).toEqual(
            expect.objectContaining({ apellidos: 'apellidos2', uid: uidUsuarioTemp }),
        )
    })
})

describe('POST /usuarios/', () => {
    test('Get all usuarios', async () => {

        const response = await request(server.app)
            .get('/api/usuarios/')
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        let { usuarios } = response.body;
        expect(usuarios).toEqual(
            expect.arrayContaining(
                [
                    expect.objectContaining(
                        { correo: 'admin1@gmail.com' },
                        { correo: 'admin2@gmail.com' }
                    )
                ]
            )
        )
    })
})

describe('POST /usuarios/', () => {
    test('Actualizar usuario', async () => {

        const response = await request(server.app)
            .put(`/api/usuarios/${uidUsuarioTemp}`)
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .send({
                nombres: 'admin3',
                apellidos: 'apellidos3',
                contrasenaAnterior: '123456',
                contrasena: '1234567'
            })
            .expect('Content-Type', /json/)
            .expect(200);

        let { usuario } = response.body;
        expect(usuario).toEqual(
            expect.objectContaining({ nombres: 'admin3', apellidos: 'apellidos3' }),
        )
    })
})

describe('POST /usuarios/', () => {
    test('Eliminar usuario', async () => {

        const response = await request(server.app)
            .delete(`/api/usuarios/${uidUsuarioTemp}`)
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .send({
                borrar_permanente: true
            })
            .expect('Content-Type', /json/)
            .expect(200);

        let { usuario } = response.body;
        expect(usuario).toEqual(
            expect.objectContaining({ estado: false }),
        )
    })
})
