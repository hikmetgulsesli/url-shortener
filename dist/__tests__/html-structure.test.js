"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
(0, node_test_1.describe)('US-010: Frontend HTML structure with Tailwind CSS', () => {
    const htmlContent = fs_1.default.readFileSync('public/index.html', 'utf8');
    (0, node_test_1.it)('should have index.html in public folder', () => {
        const htmlPath = path_1.default.join(process.cwd(), 'public', 'index.html');
        node_assert_1.default.ok(fs_1.default.existsSync(htmlPath), 'public/index.html should exist');
    });
    (0, node_test_1.it)('should have HTML5 doctype', () => {
        node_assert_1.default.ok(htmlContent.includes('<!DOCTYPE html>'), 'should have HTML5 doctype');
    });
    (0, node_test_1.it)('should have html tag with lang attribute', () => {
        node_assert_1.default.ok(htmlContent.includes('<html lang="tr">'), 'should have html tag with lang="tr"');
    });
    (0, node_test_1.it)('should have head section with meta charset', () => {
        node_assert_1.default.ok(htmlContent.includes('<head>'), 'should have head section');
        node_assert_1.default.ok(htmlContent.includes('charset="UTF-8"'), 'should have UTF-8 charset');
    });
    (0, node_test_1.it)('should have viewport meta tag', () => {
        node_assert_1.default.ok(htmlContent.includes('viewport'), 'should have viewport meta tag');
        node_assert_1.default.ok(htmlContent.includes('width=device-width'), 'should have width=device-width');
    });
    (0, node_test_1.it)('should include Tailwind CSS from CDN', () => {
        node_assert_1.default.ok(htmlContent.includes('tailwindcss'), 'should reference Tailwind CSS');
        node_assert_1.default.ok(htmlContent.includes('cdn.tailwindcss.com'), 'should use Tailwind CDN');
    });
    (0, node_test_1.it)('should have dark theme body', () => {
        node_assert_1.default.ok(htmlContent.includes('bg-gray-900'), 'should have dark background');
        node_assert_1.default.ok(htmlContent.includes('text-white'), 'should have white text');
    });
    (0, node_test_1.it)('should have container with max width', () => {
        node_assert_1.default.ok(htmlContent.includes('container'), 'should have container class');
        node_assert_1.default.ok(htmlContent.includes('max-w-4xl'), 'should have max width');
    });
    (0, node_test_1.it)('should have title', () => {
        node_assert_1.default.ok(htmlContent.includes('<title>'), 'should have title tag');
        node_assert_1.default.ok(htmlContent.includes('URL Shortener'), 'should have URL Shortener title');
    });
    (0, node_test_1.it)('should have main heading', () => {
        node_assert_1.default.ok(htmlContent.includes('<h1'), 'should have h1 heading');
        node_assert_1.default.ok(htmlContent.includes('URL Shortener'), 'should have URL Shortener heading');
    });
});
//# sourceMappingURL=html-structure.test.js.map