"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const fs_1 = __importDefault(require("fs"));
(0, node_test_1.describe)('US-013: Wire up frontend to backend API', () => {
    const htmlContent = fs_1.default.readFileSync('public/index.html', 'utf8');
    (0, node_test_1.it)('should have fetch API calls to backend', () => {
        node_assert_1.default.ok(htmlContent.includes('fetch('), 'should use fetch API');
        node_assert_1.default.ok(htmlContent.includes("'/api/shorten'"), 'should call /api/shorten');
        node_assert_1.default.ok(htmlContent.includes("'/api/links'"), 'should call /api/links');
    });
    (0, node_test_1.it)('should use POST method for shorten', () => {
        node_assert_1.default.ok(htmlContent.includes('method: \'POST\''), 'should use POST for shorten');
    });
    (0, node_test_1.it)('should set Content-Type header to JSON', () => {
        node_assert_1.default.ok(htmlContent.includes('Content-Type'), 'should set Content-Type header');
        node_assert_1.default.ok(htmlContent.includes('application/json'), 'should use application/json');
    });
    (0, node_test_1.it)('should stringify request body', () => {
        node_assert_1.default.ok(htmlContent.includes('JSON.stringify'), 'should stringify request body');
    });
    (0, node_test_1.it)('should parse JSON response', () => {
        node_assert_1.default.ok(htmlContent.includes('.json()'), 'should parse JSON response');
    });
    (0, node_test_1.it)('should handle fetch errors', () => {
        node_assert_1.default.ok(htmlContent.includes('try') && htmlContent.includes('catch'), 'should have try-catch');
        node_assert_1.default.ok(htmlContent.includes('error'), 'should handle errors');
    });
    (0, node_test_1.it)('should update UI after successful shorten', () => {
        node_assert_1.default.ok(htmlContent.includes('shortUrlEl.textContent') || htmlContent.includes('shortUrl.textContent'), 'should update shortUrl text');
        node_assert_1.default.ok(htmlContent.includes('result.classList.remove'), 'should show result');
    });
    (0, node_test_1.it)('should refresh links table after new link created', () => {
        node_assert_1.default.ok(htmlContent.includes('loadLinks()'), 'should call loadLinks after shorten');
    });
    (0, node_test_1.it)('should use window.location.origin for links', () => {
        node_assert_1.default.ok(htmlContent.includes('window.location.origin'), 'should use window.location.origin');
    });
    (0, node_test_1.it)('should handle 404 responses', () => {
        node_assert_1.default.ok(htmlContent.includes('!response.ok') || htmlContent.includes('404'), 'should handle error responses');
    });
});
//# sourceMappingURL=api-integration.test.js.map