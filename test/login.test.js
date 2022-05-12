const request = require('supertest')

const Server = require('../models/server');
const path = require('path');

require("dotenv").config("./.env")

const server = new Server();


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

        let {usuario} = response.body;
        expect(usuario).toEqual(
            expect.objectContaining({nombres: 'admin1',apellidos: 'apellidos1'}),
          );
    })
})