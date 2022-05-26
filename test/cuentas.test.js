const request = require('supertest')

const Server = require('../models/server');
const path = require('path');

require("dotenv").config("./.env")

const server = new Server();
let tokenObtenido = '';
let uidUsuarioTemp = '';
let uidCuentaTemp = '';

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

describe('POST /cuentas/', () => {
    test('Crear cuentas', async () => {

        const response = await request(server.app)
            .post('/api/cuentas/')
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .send({
                cuentaBanco : "Colpatria",
                saldo : 1236245,
                tipoCuenta : "CUENTA_CORRIENTE",
                usuario : uidUsuarioTemp
            })
            .expect('Content-Type', /json/)
            .expect(200);

        let { cuenta } = response.body;
        uidCuentaTemp = cuenta.uid;
        expect(cuenta).toEqual(
            expect.objectContaining({ cuentaBanco: 'Colpatria', uid: uidCuentaTemp }),
        )
    })
})


describe('GET /cuentas/', () => {
    test('GetById cuentas', async () => {

        const response = await request(server.app)
            .get(`/api/cuentas/${uidCuentaTemp}`)
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        let { cuenta } = response.body;
        expect(cuenta).toEqual(
            expect.objectContaining({ tipoCuenta: 'CUENTA_CORRIENTE', uid: uidCuentaTemp }),
        )
    })
})

describe('GET /cuentas/', () => {
    test('Get all cuentas', async () => {

        const response = await request(server.app)
            .get('/api/cuentas/')
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        let { cuentas } = response.body;
        expect(cuentas).toEqual(
            expect.arrayContaining(
                [
                    expect.objectContaining(
                        { cuentaBanco: 'Bancolombia' },
                        { cuentaBanco: 'Colpatria' }
                    )
                ]
            )
        )
    })
})

describe('PUT /cuentas/', () => {
    test('Actualizar cuentas', async () => {

        const response = await request(server.app)
            .put(`/api/cuentas/${uidCuentaTemp}`)
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .send({
                cuentaBanco : "Davivienda",
                saldo : 1236245,
                tipoCuenta : "CUENTA_CORRIENTE",
                usuario : uidUsuarioTemp
            })
            .expect('Content-Type', /json/)
            .expect(200);

        let { cuenta } = response.body;
        expect(cuenta).toEqual(
            expect.objectContaining({ cuentaBanco: 'Davivienda', tipoCuenta: 'CUENTA_CORRIENTE' }),
        )
    })
})

describe('DELETE /cuentas/', () => {
    test('Eliminar cuentas', async () => {

        const response = await request(server.app)
            .delete(`/api/cuentas/${uidCuentaTemp}`)
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .send({
                borrar_permanente: false
            })
            .expect('Content-Type', /json/)
            .expect(200);

        let { cuenta } = response.body;
        expect(cuenta).toEqual(
            expect.objectContaining({ estado: false }),
        )
    })
})

describe('DELETE /cuentas/', () => {
    test('Eliminar cuentas', async () => {

        const response = await request(server.app)
            .delete(`/api/cuentas/${uidCuentaTemp}`)
            .set('x-token', `${tokenObtenido}`)
            .set('Accept', 'application/json')
            .send({
                borrar_permanente: true
            })
            .expect('Content-Type', /json/)
            .expect(200);

        let { cuenta } = response.body;
        expect(cuenta).toEqual(
            expect.objectContaining({ estado: false }),
        )
    })
})