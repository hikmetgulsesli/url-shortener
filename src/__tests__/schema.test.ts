import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

describe('US-002: PostgreSQL Database Schema', () => {
  describe('schema.sql file', () => {
    it('should exist', () => {
      const schemaPath = path.join(process.cwd(), 'schema.sql');
      assert.ok(fs.existsSync(schemaPath), 'schema.sql should exist');
    });

    it('should create short_links table', () => {
      const schemaContent = fs.readFileSync('schema.sql', 'utf8');
      assert.ok(schemaContent.includes('CREATE TABLE'), 'should contain CREATE TABLE');
      assert.ok(schemaContent.includes('short_links'), 'should reference short_links table');
    });

    it('should have id column as primary key', () => {
      const schemaContent = fs.readFileSync('schema.sql', 'utf8');
      assert.ok(schemaContent.includes('id'), 'should have id column');
      assert.ok(schemaContent.includes('PRIMARY KEY'), 'should have PRIMARY KEY');
      assert.ok(schemaContent.includes('SERIAL'), 'should have SERIAL type');
    });

    it('should have code column as unique varchar(8)', () => {
      const schemaContent = fs.readFileSync('schema.sql', 'utf8');
      assert.ok(schemaContent.includes('code'), 'should have code column');
      assert.ok(schemaContent.includes('VARCHAR(8)'), 'should be VARCHAR(8)');
      assert.ok(schemaContent.includes('UNIQUE'), 'should be UNIQUE');
      assert.ok(schemaContent.includes('NOT NULL'), 'should be NOT NULL');
    });

    it('should have url column as text not null', () => {
      const schemaContent = fs.readFileSync('schema.sql', 'utf8');
      assert.ok(schemaContent.includes('url'), 'should have url column');
      assert.ok(schemaContent.includes('TEXT'), 'should be TEXT type');
    });

    it('should have clicks column with default 0', () => {
      const schemaContent = fs.readFileSync('schema.sql', 'utf8');
      assert.ok(schemaContent.includes('clicks'), 'should have clicks column');
      assert.ok(schemaContent.includes('INTEGER'), 'should be INTEGER type');
      assert.ok(schemaContent.includes('DEFAULT 0'), 'should default to 0');
    });

    it('should have created_at column with default NOW()', () => {
      const schemaContent = fs.readFileSync('schema.sql', 'utf8');
      assert.ok(schemaContent.includes('created_at'), 'should have created_at column');
      assert.ok(schemaContent.includes('TIMESTAMP'), 'should be TIMESTAMP type');
      assert.ok(schemaContent.includes('DEFAULT NOW()'), 'should default to NOW()');
    });

    it('should create index on code column', () => {
      const schemaContent = fs.readFileSync('schema.sql', 'utf8');
      assert.ok(schemaContent.includes('CREATE INDEX'), 'should create index');
      assert.ok(schemaContent.includes('idx_short_links_code'), 'should have index name');
    });

    it('should use IF NOT EXISTS for idempotent execution', () => {
      const schemaContent = fs.readFileSync('schema.sql', 'utf8');
      assert.ok(schemaContent.includes('IF NOT EXISTS'), 'should use IF NOT EXISTS');
    });
  });
});
