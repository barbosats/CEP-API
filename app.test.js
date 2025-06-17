const request = require('supertest');
const app = require('./app');
const axios = require('axios');

jest.mock('axios');

describe('GET /cep/:cep', () => {
    it('should return address data for a valid CEP', async () => {
        const mockData = { cep: '01001-000', logradouro: 'Praça da Sé' };
        axios.get.mockResolvedValueOnce({ data: mockData });

        const res = await request(app).get('/cep/01001000');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith('https://viacep.com.br/ws/01001000/json/');
    });

    it('should return 500 if axios throws an error', async () => {
        axios.get.mockRejectedValueOnce(new Error('Network error'));

        const res = await request(app).get('/cep/99999999');
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({ error: 'Erro ao buscar o CEP.' });
    });
});