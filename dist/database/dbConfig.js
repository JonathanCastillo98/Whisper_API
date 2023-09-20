"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    prod: {},
    dev: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        host: process.env.DB_HOST,
    },
    test: {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        host: process.env.DB_HOST,
    }
};
