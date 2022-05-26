const request = require('supertest')

const Server = require('../models/server');
const path = require('path');

require("dotenv").config("./.env")

const server = new Server();
let tokenObtenido = '';
let uidUsuarioTemp = '';
let cidCategoriaTemp = '';

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
        uidUsuarioTemp = usuario.uid;

        expect(usuario).toEqual(
            expect.objectContaining({ nombres: 'admin1', apellidos: 'apellidos1' }),
        );
    })
})

describe('POST /categorias/', () => {
    test('Crear categorias', async () => {

        const response = await request(server.app)
            .post('/api/categorias/')
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .send({
                nombres: 'vacaciones',
                tipo_categoria: 'GASTO',
                usuario: uidUsuarioTemp,
                
            })
            .expect('Content-Type', /json/)
            .expect(200);

        let { categoria } = response.body;
        cidCategoriaTemp = categoria.cid;
        expect(categoria).toEqual(
            expect.objectContaining({ nombres: 'vacaciones', cid: cidCategoriaTemp }),
        )
    })
})


describe('POST /categorias/', () => {
    test('GetById categorias', async () => {

        const response = await request(server.app)
            .get(`/api/categorias/${cidCategoriaTemp}`)
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        let { categoria } = response.body;
        expect(categoria).toEqual(
            expect.objectContaining({ tipo_categoria: 'GASTO', cid: cidCategoriaTemp }),
        )
    })
})

describe('POST /categorias/', () => {
    test('Get all categorias', async () => {

        const response = await request(server.app)
            .get('/api/categorias/')
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        let { categorias } = response.body;
        expect(categorias).toEqual(
            expect.arrayContaining(
                [
                    expect.objectContaining(
                        { nombres: 'pareja' },
                        { nombres: 'creditos' },
                        { nombres: 'Salario' },
                        { nombres: 'vacaciones' }
                    )
                ]
            )
        )
    })
})

describe('POST /categorias/', () => {
    test('Actualizar categorias', async () => {

        const response = await request(server.app)
            .put(`/api/categorias/${cidCategoriaTemp}`)
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .send({
                nombres: 'comisiones',
                tipo_categoria: 'INGRESO',
                usuario: uidUsuarioTemp
            })
            .expect('Content-Type', /json/)
            .expect(200);

        let { categoria } = response.body;
        expect(categoria).toEqual(
            expect.objectContaining({ nombres: 'comisiones', tipo_categoria: 'INGRESO' }),
        )
    })
})

describe('POST /categorias/', () => {
    test('Eliminar categorias', async () => {

        const response = await request(server.app)
            .delete(`/api/categorias/${cidCategoriaTemp}`)
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .send({
                borrar_permanente: true
            })
            .expect('Content-Type', /json/)
            .expect(200);

        let { categoria } = response.body;
        expect(categoria).toEqual(
            expect.objectContaining({ estado: false }),
        )
    })
})