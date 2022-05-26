const request = require('supertest')

const Server = require('../models/server');
const path = require('path');

require("dotenv").config("./.env")

const server = new Server();
let tokenObtenido = '';

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

describe('POST MAIL INVALID /auth/login', () => {
    test('logueo de usuario', async () => {

        const response = await request(server.app)
            .post('/api/auth/login')
            .send({
                correo: 'daniel@gmail.com',
                contrasena: '123456'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);

        let { msg } = response.body;
        expect(msg).toEqual('Usuario / Contrasena no son correctos - correo');
    })
})

describe('POST USER INACTIVE /auth/login', () => {
    test('logueo de usuario', async () => {

        const response = await request(server.app)
            .post('/api/auth/login')
            .send({
                correo: 'camilo_aristizabal@outlook.com',
                contrasena: 'kestrel'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);

        let { msg } = response.body;
        expect(msg).toEqual('Usuario / Contrasena no son correctos - estado:false');
    })
})

describe('POST USER WRONG PASSWORD /auth/login', () => {
    test('logueo de usuario', async () => {

        const response = await request(server.app)
            .post('/api/auth/login')
            .send({
                correo: 'admin1@gmail.com',
                contrasena: 'kestrel'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);

        let { msg } = response.body;
        expect(msg).toEqual('Usuario / Contrasena no son correctos - contrasena');
    })
})

describe('POST Internal Server Error /auth/login', () => {
    test('logueo de usuario', async () => {

        const response = await request(server.app)
            .post('/api/auth/login')
            .send({
                correo: 'admin1@gmail.com',
                contrasena: true
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500);

        let { msg } = response.body;
        expect(msg).toEqual('Hable con el administrador');
    })
})