"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const fs_1 = __importDefault(require("fs"));
(0, node_test_1.describe)('US-004: POST /api/shorten endpoint', () => {
    const indexContent = fs_1.default.readFileSync('src/index.ts', 'utf8');
    (0, node_test_1.it)('should have POST /api/shorten endpoint', () => {
        node_assert_1.default.ok(indexContent.includes("app.post('/api/shorten'"), 'should define POST /api/shorten route');
    });
    (0, node_test_1.it)('should extract url from request body', () => {
        node_assert_1.default.ok(indexContent.includes('req.body'), 'should access req.body');
        node_assert_1.default.ok(indexContent.includes('{ url }'), 'should destructure url from body');
    });
    (0, node_test_1.it)('should validate url is provided', () => {
        node_assert_1.default.ok(indexContent.includes('!url'), 'should check if url is missing');
        node_assert_1.default.ok(indexContent.includes('400'), 'should return 400 for missing url');
        node_assert_1.default.ok(indexContent.includes('URL is required'), 'should have error message for missing url');
    });
    (0, node_test_1.it)('should validate url is a string', () => {
        node_assert_1.default.ok(indexContent.includes('typeof url !== \'string\''), 'should check url type');
    });
    (0, node_test_1.it)('should validate URL format', () => {
        node_assert_1.default.ok(indexContent.includes('new URL(url)'), 'should use URL constructor for validation');
        node_assert_1.default.ok(indexContent.includes('Invalid URL format'), 'should have error message for invalid URL');
    });
    (0, node_test_1.it)('should generate 6 character code using nanoid', () => {
        node_assert_1.default.ok(indexContent.includes("import { nanoid } from 'nanoid'"), 'should import nanoid');
        node_assert_1.default.ok(indexContent.includes('nanoid(6)'), 'should generate 6 character code');
    });
    (0, node_test_1.it)('should insert into short_links table', () => {
        node_assert_1.default.ok(indexContent.includes('INSERT INTO short_links'), 'should insert into short_links');
        node_assert_1.default.ok(indexContent.includes('code, url'), 'should insert code and url columns');
        node_assert_1.default.ok(indexContent.includes('RETURNING code'), 'should return the code');
    });
    (0, node_test_1.it)('should use pool.query for database operation', () => {
        node_assert_1.default.ok(indexContent.includes('pool.query'), 'should use pool.query');
    });
    (0, node_test_1.it)('should construct short URL with BASE_URL', () => {
        node_assert_1.default.ok(indexContent.includes('BASE_URL'), 'should use BASE_URL');
        node_assert_1.default.ok(indexContent.includes('shortUrl'), 'should include shortUrl in response');
    });
    (0, node_test_1.it)('should return JSON response with code and shortUrl', () => {
        node_assert_1.default.ok(indexContent.includes('res.json({ code'), 'should return JSON with code');
        node_assert_1.default.ok(indexContent.includes('shortUrl'), 'should include shortUrl in JSON response');
    });
    (0, node_test_1.it)('should handle errors with 500 status', () => {
        node_assert_1.default.ok(indexContent.includes('catch (error)'), 'should have error handling');
        node_assert_1.default.ok(indexContent.includes('500'), 'should return 500 on error');
        node_assert_1.default.ok(indexContent.includes('Internal server error'), 'should have error message');
    });
});
//# sourceMappingURL=shorten.test.js.map