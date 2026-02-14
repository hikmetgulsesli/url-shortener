"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
(0, node_test_1.describe)('US-016: Create .env configuration file', () => {
    (0, node_test_1.it)('should have .env file', () => {
        const envPath = path_1.default.join(process.cwd(), '.env');
        node_assert_1.default.ok(fs_1.default.existsSync(envPath), '.env file should exist');
    });
    (0, node_test_1.it)('should have DATABASE_URL', () => {
        const envContent = fs_1.default.readFileSync('.env', 'utf8');
        node_assert_1.default.ok(envContent.includes('DATABASE_URL='), 'should have DATABASE_URL');
    });
    (0, node_test_1.it)('should have valid PostgreSQL DATABASE_URL format', () => {
        const envContent = fs_1.default.readFileSync('.env', 'utf8');
        const dbUrlMatch = envContent.match(/DATABASE_URL=(.+)/);
        node_assert_1.default.ok(dbUrlMatch, 'should have DATABASE_URL value');
        const dbUrl = dbUrlMatch[1];
        node_assert_1.default.ok(dbUrl.startsWith('postgresql://'), 'should start with postgresql://');
        node_assert_1.default.ok(dbUrl.includes('@'), 'should have @ for credentials');
        node_assert_1.default.ok(dbUrl.includes('/'), 'should have / for database name');
    });
    (0, node_test_1.it)('should have PORT', () => {
        const envContent = fs_1.default.readFileSync('.env', 'utf8');
        node_assert_1.default.ok(envContent.includes('PORT='), 'should have PORT');
    });
    (0, node_test_1.it)('should have PORT set to 3510', () => {
        const envContent = fs_1.default.readFileSync('.env', 'utf8');
        const portMatch = envContent.match(/PORT=(\d+)/);
        node_assert_1.default.ok(portMatch, 'should have PORT value');
        node_assert_1.default.strictEqual(portMatch[1], '3510', 'PORT should be 3510');
    });
    (0, node_test_1.it)('should have BASE_URL', () => {
        const envContent = fs_1.default.readFileSync('.env', 'utf8');
        node_assert_1.default.ok(envContent.includes('BASE_URL='), 'should have BASE_URL');
    });
    (0, node_test_1.it)('should have valid BASE_URL format', () => {
        const envContent = fs_1.default.readFileSync('.env', 'utf8');
        const baseUrlMatch = envContent.match(/BASE_URL=(https?:\/\/[^\n]+)/);
        node_assert_1.default.ok(baseUrlMatch, 'should have BASE_URL value');
        const baseUrl = baseUrlMatch[1];
        node_assert_1.default.ok(baseUrl.startsWith('https://'), 'should start with https://');
        node_assert_1.default.ok(baseUrl.includes('link.setrox.com.tr'), 'should have link.setrox.com.tr');
    });
});
//# sourceMappingURL=env-config.test.js.map