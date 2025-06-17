const request = require('supertest');
const express = require('express');
const axios = require('axios');
const cepRouter = require('./cep');

jest.mock('axios');

const app = express();
app.use('/cep', cepRouter);

describe('GET /cep/:cep', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return address data for a valid CEP', async () => {
        const mockData = {
            cep: "01001-000",
            logradouro: "Praça da Sé",
            complemento: "lado ímpar",
            bairro: "Sé",
            localidade: "São Paulo",
            uf: "SP",
            ibge: "3550308",
            gia: "1004",
            ddd: "11",
            siafi: "7107"
        };
        axios.get.mockResolvedValue({ data: mockData });

        const res = await request(app).get('/cep/01001000');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith('https://viacep.com.br/ws/01001000/json/');
    });

    it('should return 404 if CEP not found', async () => {
        axios.get.mockResolvedValue({ data: { erro: true } });

        const res = await request(app).get('/cep/00000000');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ error: 'CEP not found' });
    });

    it('should return 500 if ViaCEP service fails', async () => {
        axios.get.mockRejectedValue(new Error('Network error'));

        const res = await request(app).get('/cep/12345678');
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({ error: 'Error fetching data from ViaCEP' });
    });
});