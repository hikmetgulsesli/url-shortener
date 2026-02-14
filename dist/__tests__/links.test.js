"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const fs_1 = __importDefault(require("fs"));
(0, node_test_1.describe)('US-006: GET /api/links endpoint', () => {
    const indexContent = fs_1.default.readFileSync('src/index.ts', 'utf8');
    (0, node_test_1.it)('should have GET /api/links endpoint', () => {
        node_assert_1.default.ok(indexContent.includes("app.get('/api/links'"), 'should define GET /api/links route');
    });
    (0, node_test_1.it)('should query short_links table', () => {
        node_assert_1.default.ok(indexContent.includes('SELECT id, code, url, clicks, created_at FROM short_links'), 'should select all required columns');
    });
    (0, node_test_1.it)('should order by created_at descending', () => {
        node_assert_1.default.ok(indexContent.includes('ORDER BY created_at DESC'), 'should order by created_at DESC');
    });
    (0, node_test_1.it)('should limit to 50 results', () => {
        node_assert_1.default.ok(indexContent.includes('LIMIT 50'), 'should limit to 50 results');
    });
    (0, node_test_1.it)('should use pool.query for database operation', () => {
        node_assert_1.default.ok(indexContent.includes('pool.query'), 'should use pool.query');
    });
    (0, node_test_1.it)('should return JSON array response', () => {
        node_assert_1.default.ok(indexContent.includes('res.json(result.rows)'), 'should return result.rows as JSON');
    });
    (0, node_test_1.it)('should handle errors with 500 status', () => {
        node_assert_1.default.ok(indexContent.includes('catch (error)'), 'should have error handling');
        node_assert_1.default.ok(indexContent.includes('500'), 'should return 500 on error');
        node_assert_1.default.ok(indexContent.includes('Internal server error'), 'should have error message');
    });
});
//# sourceMappingURL=links.test.js.map