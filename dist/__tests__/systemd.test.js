"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
(0, node_test_1.describe)('US-014: Configure systemd service', () => {
    (0, node_test_1.it)('should have url-shortener.service file', () => {
        const servicePath = path_1.default.join(process.cwd(), 'url-shortener.service');
        node_assert_1.default.ok(fs_1.default.existsSync(servicePath), 'url-shortener.service should exist');
    });
    (0, node_test_1.it)('should have Unit section with Description', () => {
        const serviceContent = fs_1.default.readFileSync('url-shortener.service', 'utf8');
        node_assert_1.default.ok(serviceContent.includes('[Unit]'), 'should have Unit section');
        node_assert_1.default.ok(serviceContent.includes('Description='), 'should have Description');
        node_assert_1.default.ok(serviceContent.includes('URL Shortener'), 'should mention URL Shortener');
    });
    (0, node_test_1.it)('should have Service section', () => {
        const serviceContent = fs_1.default.readFileSync('url-shortener.service', 'utf8');
        node_assert_1.default.ok(serviceContent.includes('[Service]'), 'should have Service section');
    });
    (0, node_test_1.it)('should set Type to simple', () => {
        const serviceContent = fs_1.default.readFileSync('url-shortener.service', 'utf8');
        node_assert_1.default.ok(serviceContent.includes('Type=simple'), 'should set Type=simple');
    });
    (0, node_test_1.it)('should set WorkingDirectory', () => {
        const serviceContent = fs_1.default.readFileSync('url-shortener.service', 'utf8');
        node_assert_1.default.ok(serviceContent.includes('WorkingDirectory='), 'should set WorkingDirectory');
        node_assert_1.default.ok(serviceContent.includes('url-shortener'), 'should reference url-shortener directory');
    });
    (0, node_test_1.it)('should set ExecStart to node dist/index.js', () => {
        const serviceContent = fs_1.default.readFileSync('url-shortener.service', 'utf8');
        node_assert_1.default.ok(serviceContent.includes('ExecStart='), 'should have ExecStart');
        node_assert_1.default.ok(serviceContent.includes('dist/index.js'), 'should run dist/index.js');
    });
    (0, node_test_1.it)('should have EnvironmentFile pointing to .env', () => {
        const serviceContent = fs_1.default.readFileSync('url-shortener.service', 'utf8');
        node_assert_1.default.ok(serviceContent.includes('EnvironmentFile='), 'should have EnvironmentFile');
        node_assert_1.default.ok(serviceContent.includes('.env'), 'should reference .env file');
    });
    (0, node_test_1.it)('should have restart policy', () => {
        const serviceContent = fs_1.default.readFileSync('url-shortener.service', 'utf8');
        node_assert_1.default.ok(serviceContent.includes('Restart='), 'should have Restart policy');
    });
    (0, node_test_1.it)('should have Install section with WantedBy', () => {
        const serviceContent = fs_1.default.readFileSync('url-shortener.service', 'utf8');
        node_assert_1.default.ok(serviceContent.includes('[Install]'), 'should have Install section');
        node_assert_1.default.ok(serviceContent.includes('WantedBy='), 'should have WantedBy');
    });
});
//# sourceMappingURL=systemd.test.js.map