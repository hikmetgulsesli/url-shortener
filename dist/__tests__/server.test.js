"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const fs_1 = __importDefault(require("fs"));
(0, node_test_1.describe)('US-009: Express server entry point', () => {
    const indexContent = fs_1.default.readFileSync('src/index.ts', 'utf8');
    (0, node_test_1.it)('should have index.ts as entry point', () => {
        const fs = require('fs');
        const path = require('path');
        const indexPath = path.join(process.cwd(), 'src', 'index.ts');
        node_assert_1.default.ok(fs.existsSync(indexPath), 'src/index.ts should exist');
    });
    (0, node_test_1.it)('should import express', () => {
        node_assert_1.default.ok(indexContent.includes("import express"), 'should import express');
        node_assert_1.default.ok(indexContent.includes("from 'express'"), 'should import from express');
    });
    (0, node_test_1.it)('should create express app', () => {
        node_assert_1.default.ok(indexContent.includes('const app = express()'), 'should create express app');
    });
    (0, node_test_1.it)('should use express.json middleware', () => {
        node_assert_1.default.ok(indexContent.includes('app.use(express.json())'), 'should use json middleware');
    });
    (0, node_test_1.it)('should use express.static for public files', () => {
        node_assert_1.default.ok(indexContent.includes('express.static'), 'should use static middleware');
        node_assert_1.default.ok(indexContent.includes("'../public'"), 'should serve public directory');
    });
    (0, node_test_1.it)('should configure PORT from environment', () => {
        node_assert_1.default.ok(indexContent.includes('process.env.PORT'), 'should use PORT env var');
        node_assert_1.default.ok(indexContent.includes('|| 3510'), 'should have default port 3510');
    });
    (0, node_test_1.it)('should configure BASE_URL from environment', () => {
        node_assert_1.default.ok(indexContent.includes('process.env.BASE_URL'), 'should use BASE_URL env var');
    });
    (0, node_test_1.it)('should have health check endpoint', () => {
        node_assert_1.default.ok(indexContent.includes("app.get('/health'"), 'should have health endpoint');
        node_assert_1.default.ok(indexContent.includes('status: \'ok\''), 'should return ok status');
    });
    (0, node_test_1.it)('should start server with app.listen', () => {
        node_assert_1.default.ok(indexContent.includes('app.listen'), 'should call app.listen');
        node_assert_1.default.ok(indexContent.includes('console.log'), 'should log server start');
    });
    (0, node_test_1.it)('should have all API endpoints defined', () => {
        node_assert_1.default.ok(indexContent.includes("app.post('/api/shorten'"), 'should have shorten endpoint');
        node_assert_1.default.ok(indexContent.includes("app.get('/api/links'"), 'should have links endpoint');
        node_assert_1.default.ok(indexContent.includes("app.get('/api/stats/:code'"), 'should have stats endpoint');
        node_assert_1.default.ok(indexContent.includes("app.delete('/api/links/:code'"), 'should have delete endpoint');
        node_assert_1.default.ok(indexContent.includes("app.get('/:code'"), 'should have redirect endpoint');
    });
});
//# sourceMappingURL=server.test.js.map