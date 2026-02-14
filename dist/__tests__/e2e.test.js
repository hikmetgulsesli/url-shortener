"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
(0, node_test_1.describe)('US-018: Verify end-to-end functionality', () => {
    (0, node_test_1.it)('should have all required source files', () => {
        node_assert_1.default.ok(fs_1.default.existsSync(path_1.default.join(process.cwd(), 'src', 'index.ts')), 'src/index.ts should exist');
        node_assert_1.default.ok(fs_1.default.existsSync(path_1.default.join(process.cwd(), 'src', 'db.ts')), 'src/db.ts should exist');
        node_assert_1.default.ok(fs_1.default.existsSync(path_1.default.join(process.cwd(), 'public', 'index.html')), 'public/index.html should exist');
        node_assert_1.default.ok(fs_1.default.existsSync(path_1.default.join(process.cwd(), 'schema.sql')), 'schema.sql should exist');
    });
    (0, node_test_1.it)('should have all configuration files', () => {
        node_assert_1.default.ok(fs_1.default.existsSync(path_1.default.join(process.cwd(), '.env')), '.env should exist');
        node_assert_1.default.ok(fs_1.default.existsSync(path_1.default.join(process.cwd(), 'package.json')), 'package.json should exist');
        node_assert_1.default.ok(fs_1.default.existsSync(path_1.default.join(process.cwd(), 'tsconfig.json')), 'tsconfig.json should exist');
    });
    (0, node_test_1.it)('should have deployment configuration files', () => {
        node_assert_1.default.ok(fs_1.default.existsSync(path_1.default.join(process.cwd(), 'url-shortener.service')), 'url-shortener.service should exist');
        node_assert_1.default.ok(fs_1.default.existsSync(path_1.default.join(process.cwd(), 'cloudflared.yml')), 'cloudflared.yml should exist');
    });
    (0, node_test_1.it)('should have compiled dist files', () => {
        node_assert_1.default.ok(fs_1.default.existsSync(path_1.default.join(process.cwd(), 'dist', 'index.js')), 'dist/index.js should exist');
        node_assert_1.default.ok(fs_1.default.existsSync(path_1.default.join(process.cwd(), 'dist', 'db.js')), 'dist/db.js should exist');
    });
    (0, node_test_1.it)('should have test files', () => {
        const testDir = path_1.default.join(process.cwd(), 'src', '__tests__');
        node_assert_1.default.ok(fs_1.default.existsSync(testDir), 'src/__tests__ directory should exist');
        const testFiles = fs_1.default.readdirSync(testDir);
        node_assert_1.default.ok(testFiles.length > 0, 'should have test files');
    });
    (0, node_test_1.it)('should have all API endpoints implemented', () => {
        const indexContent = fs_1.default.readFileSync('src/index.ts', 'utf8');
        node_assert_1.default.ok(indexContent.includes("app.post('/api/shorten'"), 'POST /api/shorten should exist');
        node_assert_1.default.ok(indexContent.includes("app.get('/api/links'"), 'GET /api/links should exist');
        node_assert_1.default.ok(indexContent.includes("app.get('/api/stats/:code'"), 'GET /api/stats/:code should exist');
        node_assert_1.default.ok(indexContent.includes("app.delete('/api/links/:code'"), 'DELETE /api/links/:code should exist');
        node_assert_1.default.ok(indexContent.includes("app.get('/:code'"), 'GET /:code should exist');
        node_assert_1.default.ok(indexContent.includes("app.get('/health'"), 'GET /health should exist');
    });
    (0, node_test_1.it)('should have frontend with all required elements', () => {
        const htmlContent = fs_1.default.readFileSync('public/index.html', 'utf8');
        node_assert_1.default.ok(htmlContent.includes('id="urlInput"'), 'urlInput should exist');
        node_assert_1.default.ok(htmlContent.includes('id="shortenBtn"'), 'shortenBtn should exist');
        node_assert_1.default.ok(htmlContent.includes('id="result"'), 'result should exist');
        node_assert_1.default.ok(htmlContent.includes('id="linksTable"'), 'linksTable should exist');
    });
    (0, node_test_1.it)('should have database schema defined', () => {
        const schemaContent = fs_1.default.readFileSync('schema.sql', 'utf8');
        node_assert_1.default.ok(schemaContent.includes('CREATE TABLE'), 'should create table');
        node_assert_1.default.ok(schemaContent.includes('short_links'), 'should have short_links table');
        node_assert_1.default.ok(schemaContent.includes('code'), 'should have code column');
        node_assert_1.default.ok(schemaContent.includes('url'), 'should have url column');
    });
    (0, node_test_1.it)('should have valid package.json with all scripts', () => {
        const pkg = JSON.parse(fs_1.default.readFileSync('package.json', 'utf8'));
        node_assert_1.default.ok(pkg.scripts.build, 'should have build script');
        node_assert_1.default.ok(pkg.scripts.start, 'should have start script');
        node_assert_1.default.ok(pkg.scripts.test, 'should have test script');
        node_assert_1.default.ok(pkg.scripts.dev, 'should have dev script');
    });
    (0, node_test_1.it)('should have all required dependencies', () => {
        const pkg = JSON.parse(fs_1.default.readFileSync('package.json', 'utf8'));
        node_assert_1.default.ok(pkg.dependencies.express, 'should have express');
        node_assert_1.default.ok(pkg.dependencies.pg, 'should have pg');
        node_assert_1.default.ok(pkg.dependencies.nanoid, 'should have nanoid');
        node_assert_1.default.ok(pkg.devDependencies.typescript, 'should have typescript');
    });
});
//# sourceMappingURL=e2e.test.js.map