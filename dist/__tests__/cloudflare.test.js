"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
(0, node_test_1.describe)('US-015: Configure Cloudflare tunnel', () => {
    (0, node_test_1.it)('should have cloudflared.yml file', () => {
        const configPath = path_1.default.join(process.cwd(), 'cloudflared.yml');
        node_assert_1.default.ok(fs_1.default.existsSync(configPath), 'cloudflared.yml should exist');
    });
    (0, node_test_1.it)('should have tunnel name', () => {
        const configContent = fs_1.default.readFileSync('cloudflared.yml', 'utf8');
        node_assert_1.default.ok(configContent.includes('tunnel:'), 'should have tunnel field');
        node_assert_1.default.ok(configContent.includes('url-shortener-tunnel'), 'should have tunnel name');
    });
    (0, node_test_1.it)('should have credentials-file path', () => {
        const configContent = fs_1.default.readFileSync('cloudflared.yml', 'utf8');
        node_assert_1.default.ok(configContent.includes('credentials-file:'), 'should have credentials-file');
    });
    (0, node_test_1.it)('should have ingress rules', () => {
        const configContent = fs_1.default.readFileSync('cloudflared.yml', 'utf8');
        node_assert_1.default.ok(configContent.includes('ingress:'), 'should have ingress section');
    });
    (0, node_test_1.it)('should have hostname for link.setrox.com.tr', () => {
        const configContent = fs_1.default.readFileSync('cloudflared.yml', 'utf8');
        node_assert_1.default.ok(configContent.includes('hostname:'), 'should have hostname');
        node_assert_1.default.ok(configContent.includes('link.setrox.com.tr'), 'should have link.setrox.com.tr');
    });
    (0, node_test_1.it)('should route to localhost:3510', () => {
        const configContent = fs_1.default.readFileSync('cloudflared.yml', 'utf8');
        node_assert_1.default.ok(configContent.includes('service:'), 'should have service');
        node_assert_1.default.ok(configContent.includes('localhost:3510'), 'should route to localhost:3510');
    });
    (0, node_test_1.it)('should have catch-all 404 service', () => {
        const configContent = fs_1.default.readFileSync('cloudflared.yml', 'utf8');
        node_assert_1.default.ok(configContent.includes('http_status:404'), 'should have 404 catch-all');
    });
});
//# sourceMappingURL=cloudflare.test.js.map