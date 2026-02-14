"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
(0, node_test_1.describe)('US-002: PostgreSQL Database Schema', () => {
    (0, node_test_1.describe)('schema.sql file', () => {
        (0, node_test_1.it)('should exist', () => {
            const schemaPath = path_1.default.join(process.cwd(), 'schema.sql');
            node_assert_1.default.ok(fs_1.default.existsSync(schemaPath), 'schema.sql should exist');
        });
        (0, node_test_1.it)('should create short_links table', () => {
            const schemaContent = fs_1.default.readFileSync('schema.sql', 'utf8');
            node_assert_1.default.ok(schemaContent.includes('CREATE TABLE'), 'should contain CREATE TABLE');
            node_assert_1.default.ok(schemaContent.includes('short_links'), 'should reference short_links table');
        });
        (0, node_test_1.it)('should have id column as primary key', () => {
            const schemaContent = fs_1.default.readFileSync('schema.sql', 'utf8');
            node_assert_1.default.ok(schemaContent.includes('id'), 'should have id column');
            node_assert_1.default.ok(schemaContent.includes('PRIMARY KEY'), 'should have PRIMARY KEY');
            node_assert_1.default.ok(schemaContent.includes('SERIAL'), 'should have SERIAL type');
        });
        (0, node_test_1.it)('should have code column as unique varchar(8)', () => {
            const schemaContent = fs_1.default.readFileSync('schema.sql', 'utf8');
            node_assert_1.default.ok(schemaContent.includes('code'), 'should have code column');
            node_assert_1.default.ok(schemaContent.includes('VARCHAR(8)'), 'should be VARCHAR(8)');
            node_assert_1.default.ok(schemaContent.includes('UNIQUE'), 'should be UNIQUE');
            node_assert_1.default.ok(schemaContent.includes('NOT NULL'), 'should be NOT NULL');
        });
        (0, node_test_1.it)('should have url column as text not null', () => {
            const schemaContent = fs_1.default.readFileSync('schema.sql', 'utf8');
            node_assert_1.default.ok(schemaContent.includes('url'), 'should have url column');
            node_assert_1.default.ok(schemaContent.includes('TEXT'), 'should be TEXT type');
        });
        (0, node_test_1.it)('should have clicks column with default 0', () => {
            const schemaContent = fs_1.default.readFileSync('schema.sql', 'utf8');
            node_assert_1.default.ok(schemaContent.includes('clicks'), 'should have clicks column');
            node_assert_1.default.ok(schemaContent.includes('INTEGER'), 'should be INTEGER type');
            node_assert_1.default.ok(schemaContent.includes('DEFAULT 0'), 'should default to 0');
        });
        (0, node_test_1.it)('should have created_at column with default NOW()', () => {
            const schemaContent = fs_1.default.readFileSync('schema.sql', 'utf8');
            node_assert_1.default.ok(schemaContent.includes('created_at'), 'should have created_at column');
            node_assert_1.default.ok(schemaContent.includes('TIMESTAMP'), 'should be TIMESTAMP type');
            node_assert_1.default.ok(schemaContent.includes('DEFAULT NOW()'), 'should default to NOW()');
        });
        (0, node_test_1.it)('should create index on code column', () => {
            const schemaContent = fs_1.default.readFileSync('schema.sql', 'utf8');
            node_assert_1.default.ok(schemaContent.includes('CREATE INDEX'), 'should create index');
            node_assert_1.default.ok(schemaContent.includes('idx_short_links_code'), 'should have index name');
        });
        (0, node_test_1.it)('should use IF NOT EXISTS for idempotent execution', () => {
            const schemaContent = fs_1.default.readFileSync('schema.sql', 'utf8');
            node_assert_1.default.ok(schemaContent.includes('IF NOT EXISTS'), 'should use IF NOT EXISTS');
        });
    });
});
//# sourceMappingURL=schema.test.js.map