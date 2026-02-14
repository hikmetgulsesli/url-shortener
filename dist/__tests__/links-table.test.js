"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const fs_1 = __importDefault(require("fs"));
(0, node_test_1.describe)('US-012: Links table in frontend', () => {
    const htmlContent = fs_1.default.readFileSync('public/index.html', 'utf8');
    (0, node_test_1.it)('should have links table element', () => {
        node_assert_1.default.ok(htmlContent.includes('id="linksTable"'), 'should have linksTable element');
        node_assert_1.default.ok(htmlContent.includes('<table'), 'should have table element');
    });
    (0, node_test_1.it)('should have table headers for code, url, clicks, date', () => {
        node_assert_1.default.ok(htmlContent.includes('Kod') || htmlContent.includes('code'), 'should have code header');
        node_assert_1.default.ok(htmlContent.includes('URL') || htmlContent.includes('url'), 'should have URL header');
        node_assert_1.default.ok(htmlContent.includes('Tıklama') || htmlContent.includes('clicks'), 'should have clicks header');
        node_assert_1.default.ok(htmlContent.includes('Tarih') || htmlContent.includes('date'), 'should have date header');
    });
    (0, node_test_1.it)('should have tbody for dynamic content', () => {
        node_assert_1.default.ok(htmlContent.includes('<tbody'), 'should have tbody element');
    });
    (0, node_test_1.it)('should fetch links from /api/links endpoint', () => {
        node_assert_1.default.ok(htmlContent.includes("fetch('/api/links'"), 'should fetch from /api/links');
    });
    (0, node_test_1.it)('should have loadLinks function', () => {
        node_assert_1.default.ok(htmlContent.includes('async function loadLinks'), 'should have loadLinks function');
    });
    (0, node_test_1.it)('should display code as clickable link', () => {
        node_assert_1.default.ok(htmlContent.includes('link.code'), 'should reference link.code');
        node_assert_1.default.ok(htmlContent.includes('target="_blank"'), 'should open links in new tab');
    });
    (0, node_test_1.it)('should display original URL', () => {
        node_assert_1.default.ok(htmlContent.includes('link.url'), 'should reference link.url');
    });
    (0, node_test_1.it)('should display click count', () => {
        node_assert_1.default.ok(htmlContent.includes('link.clicks'), 'should reference link.clicks');
    });
    (0, node_test_1.it)('should display creation date', () => {
        node_assert_1.default.ok(htmlContent.includes('link.created_at'), 'should reference link.created_at');
        node_assert_1.default.ok(htmlContent.includes('toLocaleDateString'), 'should format date');
    });
    (0, node_test_1.it)('should auto-refresh links periodically', () => {
        node_assert_1.default.ok(htmlContent.includes('setInterval'), 'should use setInterval for auto-refresh');
        node_assert_1.default.ok(htmlContent.includes('loadLinks'), 'should call loadLinks in interval');
    });
});
//# sourceMappingURL=links-table.test.js.map