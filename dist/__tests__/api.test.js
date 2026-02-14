"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
(0, node_test_1.describe)('API Implementation', () => {
    (0, node_test_1.describe)('Database Module', () => {
        (0, node_test_1.it)('should have db.ts file', () => {
            const dbPath = path_1.default.join(process.cwd(), 'src', 'db.ts');
            node_assert_1.default.ok(fs_1.default.existsSync(dbPath), 'db.ts should exist');
        });
        (0, node_test_1.it)('should import pg Pool', () => {
            const dbContent = fs_1.default.readFileSync('src/db.ts', 'utf8');
            node_assert_1.default.ok(dbContent.includes("from 'pg'"), 'should import from pg');
            node_assert_1.default.ok(dbContent.includes('Pool'), 'should use Pool');
        });
    });
    (0, node_test_1.describe)('Express Server', () => {
        (0, node_test_1.it)('should have index.ts file', () => {
            const indexPath = path_1.default.join(process.cwd(), 'src', 'index.ts');
            node_assert_1.default.ok(fs_1.default.existsSync(indexPath), 'index.ts should exist');
        });
        (0, node_test_1.it)('should import express', () => {
            const indexContent = fs_1.default.readFileSync('src/index.ts', 'utf8');
            node_assert_1.default.ok(indexContent.includes("import express"), 'should import express');
        });
        (0, node_test_1.it)('should have POST /api/shorten endpoint', () => {
            const indexContent = fs_1.default.readFileSync('src/index.ts', 'utf8');
            node_assert_1.default.ok(indexContent.includes("app.post('/api/shorten'"), 'should have POST /api/shorten');
        });
        (0, node_test_1.it)('should have GET /api/links endpoint', () => {
            const indexContent = fs_1.default.readFileSync('src/index.ts', 'utf8');
            node_assert_1.default.ok(indexContent.includes("app.get('/api/links'"), 'should have GET /api/links');
        });
        (0, node_test_1.it)('should have GET /api/stats/:code endpoint', () => {
            const indexContent = fs_1.default.readFileSync('src/index.ts', 'utf8');
            node_assert_1.default.ok(indexContent.includes("app.get('/api/stats/:code'"), 'should have GET /api/stats/:code');
        });
        (0, node_test_1.it)('should have DELETE /api/links/:code endpoint', () => {
            const indexContent = fs_1.default.readFileSync('src/index.ts', 'utf8');
            node_assert_1.default.ok(indexContent.includes("app.delete('/api/links/:code'"), 'should have DELETE /api/links/:code');
        });
        (0, node_test_1.it)('should have GET /:code redirect endpoint', () => {
            const indexContent = fs_1.default.readFileSync('src/index.ts', 'utf8');
            node_assert_1.default.ok(indexContent.includes("app.get('/:code'"), 'should have GET /:code');
        });
    });
    (0, node_test_1.describe)('Database Schema', () => {
        (0, node_test_1.it)('should have schema.sql file', () => {
            const schemaPath = path_1.default.join(process.cwd(), 'schema.sql');
            node_assert_1.default.ok(fs_1.default.existsSync(schemaPath), 'schema.sql should exist');
        });
        (0, node_test_1.it)('should create short_links table', () => {
            const schemaContent = fs_1.default.readFileSync('schema.sql', 'utf8');
            node_assert_1.default.ok(schemaContent.includes('short_links'), 'should reference short_links table');
            node_assert_1.default.ok(schemaContent.includes('code'), 'should have code column');
            node_assert_1.default.ok(schemaContent.includes('url'), 'should have url column');
            node_assert_1.default.ok(schemaContent.includes('clicks'), 'should have clicks column');
        });
    });
});
//# sourceMappingURL=api.test.js.map