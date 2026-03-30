"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiAdapter = void 0;
const axios_1 = __importDefault(require("axios"));
class ApiAdapter {
    client;
    constructor(baseURL) {
        this.client = axios_1.default.create({ baseURL });
    }
    async get(url) {
        const response = await this.client.get(url);
        console.log(`📡 GET ${url} -> ${response.status}`);
        return response.data;
    }
    async post(url, data) {
        const response = await this.client.post(url, data);
        console.log(`📡 POST ${url} -> ${response.status}`);
        return response.data;
    }
    async expect(condition) {
        // Basic implementation for API expectation
        if (!condition) {
            throw new Error(`API expectation failed`);
        }
    }
}
exports.ApiAdapter = ApiAdapter;
//# sourceMappingURL=index.js.map