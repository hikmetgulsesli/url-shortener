"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
(0, node_test_1.describe)('US-003: DB Connection Module', () => {
    (0, node_test_1.describe)('db.ts file', () => {
        (0, node_test_1.it)('should exist', () => {
            const dbPath = path_1.default.join(process.cwd(), 'src', 'db.ts');
            node_assert_1.default.ok(fs_1.default.existsSync(dbPath), 'db.ts should exist');
        });
        (0, node_test_1.it)('should import Pool from pg', () => {
            const dbContent = fs_1.default.readFileSync('src/db.ts', 'utf8');
            node_assert_1.default.ok(dbContent.includes("import { Pool } from 'pg'"), 'should import Pool from pg');
        });
        (0, node_test_1.it)('should create Pool instance', () => {
            const dbContent = fs_1.default.readFileSync('src/db.ts', 'utf8');
            node_assert_1.default.ok(dbContent.includes('new Pool'), 'should create new Pool instance');
        });
        (0, node_test_1.it)('should use DATABASE_URL from environment', () => {
            const dbContent = fs_1.default.readFileSync('src/db.ts', 'utf8');
            node_assert_1.default.ok(dbContent.includes('process.env.DATABASE_URL'), 'should use DATABASE_URL env var');
        });
        (0, node_test_1.it)('should pass connectionString to Pool', () => {
            const dbContent = fs_1.default.readFileSync('src/db.ts', 'utf8');
            node_assert_1.default.ok(dbContent.includes('connectionString'), 'should pass connectionString option');
        });
        (0, node_test_1.it)('should export pool as default', () => {
            const dbContent = fs_1.default.readFileSync('src/db.ts', 'utf8');
            node_assert_1.default.ok(dbContent.includes('export default pool'), 'should export pool as default');
        });
    });
    (0, node_test_1.describe)('.env configuration', () => {
        (0, node_test_1.it)('should have .env file', () => {
            const envPath = path_1.default.join(process.cwd(), '.env');
            node_assert_1.default.ok(fs_1.default.existsSync(envPath), '.env file should exist');
        });
        (0, node_test_1.it)('should contain DATABASE_URL', () => {
            const envContent = fs_1.default.readFileSync('.env', 'utf8');
            node_assert_1.default.ok(envContent.includes('DATABASE_URL'), 'should contain DATABASE_URL');
        });
        (0, node_test_1.it)('should have valid PostgreSQL connection string format', () => {
            const envContent = fs_1.default.readFileSync('.env', 'utf8');
            const dbUrlMatch = envContent.match(/DATABASE_URL=(.+)/);
            node_assert_1.default.ok(dbUrlMatch, 'should have DATABASE_URL value');
            const dbUrl = dbUrlMatch[1];
            node_assert_1.default.ok(dbUrl.startsWith('postgresql://'), 'should start with postgresql://');
        });
    });
});
//# sourceMappingURL=db.test.js.map