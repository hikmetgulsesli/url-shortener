"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const fs_1 = __importDefault(require("fs"));
(0, node_test_1.describe)('US-007: GET /api/stats/:code endpoint', () => {
    const indexContent = fs_1.default.readFileSync('src/index.ts', 'utf8');
    (0, node_test_1.it)('should have GET /api/stats/:code endpoint', () => {
        node_assert_1.default.ok(indexContent.includes("app.get('/api/stats/:code'"), 'should define GET /api/stats/:code route');
    });
    (0, node_test_1.it)('should extract code from request params', () => {
        node_assert_1.default.ok(indexContent.includes('req.params'), 'should access req.params');
        node_assert_1.default.ok(indexContent.includes('{ code }'), 'should destructure code from params');
    });
    (0, node_test_1.it)('should query short_links table by code', () => {
        node_assert_1.default.ok(indexContent.includes('SELECT code, url, clicks, created_at FROM short_links'), 'should select stats columns');
        node_assert_1.default.ok(indexContent.includes('WHERE code = $1'), 'should filter by code');
    });
    (0, node_test_1.it)('should use pool.query for database operation', () => {
        node_assert_1.default.ok(indexContent.includes('pool.query'), 'should use pool.query');
    });
    (0, node_test_1.it)('should return 404 if link not found', () => {
        node_assert_1.default.ok(indexContent.includes('result.rows.length === 0'), 'should check if result is empty');
        node_assert_1.default.ok(indexContent.includes('404'), 'should return 404 status');
        node_assert_1.default.ok(indexContent.includes('Link not found'), 'should have error message');
    });
    (0, node_test_1.it)('should return JSON with link stats', () => {
        node_assert_1.default.ok(indexContent.includes('res.json(result.rows[0])'), 'should return first row as JSON');
    });
    (0, node_test_1.it)('should handle errors with 500 status', () => {
        node_assert_1.default.ok(indexContent.includes('catch (error)'), 'should have error handling');
        node_assert_1.default.ok(indexContent.includes('500'), 'should return 500 on error');
        node_assert_1.default.ok(indexContent.includes('Internal server error'), 'should have error message');
    });
});
//# sourceMappingURL=stats.test.js.map