const http = require('http');
const app = require('../../app');
const app = require('../../app');

// filepath: index.test.js

jest.mock('./app', () => {
    return {
        listen: jest.fn((port, callback) => {
            callback && callback();
        }),
    };
});

describe('index.js', () => {
    let originalEnv;

    beforeEach(() => {
        originalEnv = process.env.PORT;
        jest.resetModules();
    });

    afterEach(() => {
        process.env.PORT = originalEnv;
        jest.clearAllMocks();
    });

    it('should use process.env.PORT if defined', () => {
        process.env.PORT = 4000;
        require('../../index');
        expect(app.listen).toHaveBeenCalledWith(4000, expect.any(Function));
    });

    it('should default to port 3000 if process.env.PORT is not defined', () => {
        delete process.env.PORT;
        require('../../index');
        expect(app.listen).toHaveBeenCalledWith(3000, expect.any(Function));
    });

    it('should log the correct message when server starts', () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        process.env.PORT = 1234;
        require('../../index');
        expect(logSpy).toHaveBeenCalledWith('Servidor rodando na porta 1234');
        logSpy.mockRestore();
    });
});