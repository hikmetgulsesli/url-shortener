"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const fs_1 = __importDefault(require("fs"));
(0, node_test_1.describe)('US-005: GET /:code redirect endpoint', () => {
    const indexContent = fs_1.default.readFileSync('src/index.ts', 'utf8');
    (0, node_test_1.it)('should have GET /:code endpoint', () => {
        node_assert_1.default.ok(indexContent.includes("app.get('/:code'"), 'should define GET /:code route');
    });
    (0, node_test_1.it)('should extract code from request params', () => {
        node_assert_1.default.ok(indexContent.includes('req.params'), 'should access req.params');
        node_assert_1.default.ok(indexContent.includes('{ code }'), 'should destructure code from params');
    });
    (0, node_test_1.it)('should skip API routes', () => {
        node_assert_1.default.ok(indexContent.includes('api/') || indexContent.includes('code.startsWith'), 'should check for api routes');
        node_assert_1.default.ok(indexContent.includes('404'), 'should return 404 for API routes');
    });
    (0, node_test_1.it)('should update clicks counter in database', () => {
        node_assert_1.default.ok(indexContent.includes('UPDATE short_links'), 'should update short_links');
        node_assert_1.default.ok(indexContent.includes('clicks = clicks + 1'), 'should increment clicks');
        node_assert_1.default.ok(indexContent.includes('SET clicks'), 'should use SET clicks');
    });
    (0, node_test_1.it)('should use pool.query for database operation', () => {
        node_assert_1.default.ok(indexContent.includes('pool.query'), 'should use pool.query');
    });
    (0, node_test_1.it)('should return 404 if link not found', () => {
        node_assert_1.default.ok(indexContent.includes('result.rows.length === 0'), 'should check if result is empty');
        node_assert_1.default.ok(indexContent.includes('404'), 'should return 404 status');
    });
    (0, node_test_1.it)('should redirect to original URL with 302', () => {
        node_assert_1.default.ok(indexContent.includes('res.redirect'), 'should call res.redirect');
        node_assert_1.default.ok(indexContent.includes('302'), 'should use 302 status code');
        node_assert_1.default.ok(indexContent.includes('result.rows[0].url'), 'should redirect to original url');
    });
    (0, node_test_1.it)('should handle errors with 500 status', () => {
        node_assert_1.default.ok(indexContent.includes('catch (error)'), 'should have error handling');
        node_assert_1.default.ok(indexContent.includes('500'), 'should return 500 on error');
    });
});
//# sourceMappingURL=redirect.test.js.map