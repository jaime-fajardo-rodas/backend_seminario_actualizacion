const request = require('supertest')

const Server = require('../models/server');
const path = require('path');

require("dotenv").config("./.env")

const server = new Server();
let tokenObtenido = '';
let uidGastoTemp = '';
let uidCuentaTemp = '6282c051a0280a09d6217cfe';
let cidCategoriaTemp = '628275290eea8b288101cc4f';

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

describe('POST /gastos/', () => {
    test('Crear gastos', async () => {

        const response = await request(server.app)
            .post('/api/gastos/')
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .send({
                fecha : "2022-05-25",
                nombre : "Gasolina",
                valor : 15000,
                cuenta : uidCuentaTemp,
                categoria : cidCategoriaTemp,
                estado : true
            })
            .expect('Content-Type', /json/)
            .expect(200);

        let { gasto } = response.body;
        uidGastoTemp = gasto.uid;
        expect(gasto).toEqual(
            expect.objectContaining({ nombre: 'Gasolina', uid: uidGastoTemp }),
        )
    })
})


describe('GET /gastos/', () => {
    test('GetById gastos', async () => {

        const response = await request(server.app)
            .get(`/api/gastos/${uidGastoTemp}`)
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        let { gasto } = response.body;
        expect(gasto).toEqual(
            expect.objectContaining({ nombre: 'Gasolina', valor: 15000 }),
        )
    })
})

describe('GET /gastos/', () => {
    test('Get all gastos', async () => {

        const response = await request(server.app)
            .get('/api/gastos/')
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        let { gastos } = response.body;
        expect(gastos).toEqual(
            expect.arrayContaining(
                [
                    expect.objectContaining(
                        { nombre: 'un paquete de papitas' },
                        { nombre: 'Mas comida' },
                        { nombre: 'Gasolina' }
                    )
                ]
            )
        )
    })
})

describe('PUT /gastos/', () => {
    test('Actualizar gastos', async () => {

        const response = await request(server.app)
            .put(`/api/gastos/${uidGastoTemp}`)
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .send({
                fecha : "2022-05-25",
                nombre : "Tanqueada",
                valor : 32500,
                cuenta : uidCuentaTemp,
                categoria : cidCategoriaTemp,
                estado : true
            })
            .expect('Content-Type', /json/)
            .expect(200);

        let { gasto } = response.body;
        expect(gasto).toEqual(
            expect.objectContaining({ nombre: 'Tanqueada', valor: 32500 }),
        )
    })
})

describe('DELETE /gastos/', () => {
    test('Eliminar gastos', async () => {

        const response = await request(server.app)
            .delete(`/api/gastos/${uidGastoTemp}`)
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        let { gasto } = response.body;
        expect(gasto).toEqual(
            expect.objectContaining({ uid: uidGastoTemp }),
        )
    })
})