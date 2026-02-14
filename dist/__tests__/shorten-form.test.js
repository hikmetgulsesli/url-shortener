"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const fs_1 = __importDefault(require("fs"));
(0, node_test_1.describe)('US-011: URL shorten form in frontend', () => {
    const htmlContent = fs_1.default.readFileSync('public/index.html', 'utf8');
    (0, node_test_1.it)('should have URL input field', () => {
        node_assert_1.default.ok(htmlContent.includes('id="urlInput"'), 'should have urlInput element');
        node_assert_1.default.ok(htmlContent.includes('type="url"'), 'should have url type input');
        node_assert_1.default.ok(htmlContent.includes('placeholder='), 'should have placeholder');
    });
    (0, node_test_1.it)('should have shorten button', () => {
        node_assert_1.default.ok(htmlContent.includes('id="shortenBtn"'), 'should have shortenBtn element');
        node_assert_1.default.ok(htmlContent.includes('Kısalt'), 'should have Kısalt button text');
    });
    (0, node_test_1.it)('should have result display area', () => {
        node_assert_1.default.ok(htmlContent.includes('id="result"'), 'should have result element');
        node_assert_1.default.ok(htmlContent.includes('id="shortUrl"'), 'should have shortUrl element');
    });
    (0, node_test_1.it)('should have copy button', () => {
        node_assert_1.default.ok(htmlContent.includes('id="copyBtn"'), 'should have copyBtn element');
        node_assert_1.default.ok(htmlContent.includes('Kopyala'), 'should have Kopyala button text');
    });
    (0, node_test_1.it)('should have error message display', () => {
        node_assert_1.default.ok(htmlContent.includes('id="errorMsg"'), 'should have errorMsg element');
    });
    (0, node_test_1.it)('should have event listener for shorten button', () => {
        node_assert_1.default.ok(htmlContent.includes('shortenBtn.addEventListener'), 'should have shorten button listener');
        node_assert_1.default.ok(htmlContent.includes('click'), 'should listen for click event');
    });
    (0, node_test_1.it)('should fetch from /api/shorten endpoint', () => {
        node_assert_1.default.ok(htmlContent.includes("fetch('/api/shorten'"), 'should fetch from /api/shorten');
        node_assert_1.default.ok(htmlContent.includes('method: \'POST\''), 'should use POST method');
    });
    (0, node_test_1.it)('should handle Enter key press', () => {
        node_assert_1.default.ok(htmlContent.includes('keypress') || htmlContent.includes('keydown') || htmlContent.includes('keyup'), 'should have key event listener');
        node_assert_1.default.ok(htmlContent.includes('Enter'), 'should check for Enter key');
    });
    (0, node_test_1.it)('should use clipboard API for copy', () => {
        node_assert_1.default.ok(htmlContent.includes('navigator.clipboard.writeText'), 'should use clipboard API');
    });
    (0, node_test_1.it)('should validate URL before submitting', () => {
        node_assert_1.default.ok(htmlContent.includes('.trim()'), 'should trim URL input');
        node_assert_1.default.ok(htmlContent.includes('!url'), 'should check if url is empty');
    });
});
//# sourceMappingURL=shorten-form.test.js.map