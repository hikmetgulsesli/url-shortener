"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
(0, node_test_1.describe)('Frontend Implementation', () => {
    (0, node_test_1.describe)('HTML Structure', () => {
        (0, node_test_1.it)('should have index.html file', () => {
            const htmlPath = path_1.default.join(process.cwd(), 'public', 'index.html');
            node_assert_1.default.ok(fs_1.default.existsSync(htmlPath), 'index.html should exist');
        });
        (0, node_test_1.it)('should include Tailwind CSS', () => {
            const htmlContent = fs_1.default.readFileSync('public/index.html', 'utf8');
            node_assert_1.default.ok(htmlContent.includes('tailwindcss'), 'should include Tailwind CSS');
        });
        (0, node_test_1.it)('should have URL input field', () => {
            const htmlContent = fs_1.default.readFileSync('public/index.html', 'utf8');
            node_assert_1.default.ok(htmlContent.includes('urlInput'), 'should have urlInput element');
            node_assert_1.default.ok(htmlContent.includes('type="url"'), 'should have URL type input');
        });
        (0, node_test_1.it)('should have shorten button', () => {
            const htmlContent = fs_1.default.readFileSync('public/index.html', 'utf8');
            node_assert_1.default.ok(htmlContent.includes('shortenBtn'), 'should have shortenBtn element');
            node_assert_1.default.ok(htmlContent.includes('Kısalt'), 'should have Kısalt button text');
        });
        (0, node_test_1.it)('should have copy button', () => {
            const htmlContent = fs_1.default.readFileSync('public/index.html', 'utf8');
            node_assert_1.default.ok(htmlContent.includes('copyBtn'), 'should have copyBtn element');
            node_assert_1.default.ok(htmlContent.includes('Kopyala'), 'should have Kopyala button text');
        });
        (0, node_test_1.it)('should have links table', () => {
            const htmlContent = fs_1.default.readFileSync('public/index.html', 'utf8');
            node_assert_1.default.ok(htmlContent.includes('linksTable'), 'should have linksTable element');
            node_assert_1.default.ok(htmlContent.includes('<table'), 'should have table element');
        });
    });
    (0, node_test_1.describe)('JavaScript Functionality', () => {
        (0, node_test_1.it)('should have fetch call to /api/shorten', () => {
            const htmlContent = fs_1.default.readFileSync('public/index.html', 'utf8');
            node_assert_1.default.ok(htmlContent.includes("/api/shorten"), 'should call /api/shorten endpoint');
        });
        (0, node_test_1.it)('should have fetch call to /api/links', () => {
            const htmlContent = fs_1.default.readFileSync('public/index.html', 'utf8');
            node_assert_1.default.ok(htmlContent.includes("/api/links"), 'should call /api/links endpoint');
        });
        (0, node_test_1.it)('should handle copy to clipboard', () => {
            const htmlContent = fs_1.default.readFileSync('public/index.html', 'utf8');
            node_assert_1.default.ok(htmlContent.includes('clipboard.writeText'), 'should use clipboard API');
        });
    });
});
//# sourceMappingURL=frontend.test.js.map