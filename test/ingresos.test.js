const request = require('supertest')

const Server = require('../models/server');
const path = require('path');

require("dotenv").config("./.env")

const server = new Server();
let tokenObtenido = '';
let uidIngresosTemp = '';
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

describe('POST /ingresos/', () => {
    test('Crear ingresos', async () => {

        const response = await request(server.app)
            .post('/api/ingresos/')
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .send({
                fecha : "2022-04-01",
                nombre : "Salario abril",
                valor : 4500000,
                cuenta : uidCuentaTemp,
                categoria : cidCategoriaTemp,
                estado : true
            })
            .expect('Content-Type', /json/)
            .expect(200);

        let { ingreso } = response.body;
        uidIngresosTemp = ingreso.uid;
        expect(ingreso).toEqual(
            expect.objectContaining({ nombre: 'Salario abril', uid: uidIngresosTemp }),
        )
    })
})


describe('GET /ingresos/', () => {
    test('GetById ingresos', async () => {

        const response = await request(server.app)
            .get(`/api/ingresos/${uidIngresosTemp}`)
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        let { ingreso } = response.body;
        expect(ingreso).toEqual(
            expect.objectContaining({ nombre: 'Salario abril', valor: 4500000 }),
        )
    })
})

describe('GET /ingresos/', () => {
    test('Get all ingresos', async () => {

        const response = await request(server.app)
            .get('/api/ingresos/')
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        let { ingresos } = response.body;
        expect(ingresos).toEqual(
            expect.arrayContaining(
                [
                    expect.objectContaining(
                        { nombre: 'Salario mayo' },
                        { nombre: 'Salario abril' }
                    )
                ]
            )
        )
    })
})

describe('PUT /ingresos/', () => {
    test('Actualizar ingresos', async () => {

        const response = await request(server.app)
            .put(`/api/ingresos/${uidIngresosTemp}`)
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .send({
                fecha : "2022-06-01",
                nombre : "Salario junio",
                valor : 3000000,
                cuenta : uidCuentaTemp,
                categoria : cidCategoriaTemp,
                estado : false
            })
            .expect('Content-Type', /json/)
            .expect(200);

        let { ingreso } = response.body;
        expect(ingreso).toEqual(
            expect.objectContaining({ nombre: 'Salario junio', valor: 3000000 }),
        )
    })
})

describe('DELETE /ingresos/', () => {
    test('Eliminar ingresos', async () => {

        const response = await request(server.app)
            .delete(`/api/ingresos/${uidIngresosTemp}`)
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        let { ingreso } = response.body;

        expect(ingreso).toEqual(
            expect.objectContaining({ uid: uidIngresosTemp }),
        )
    })
})