import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

describe('API Implementation', () => {
  describe('Database Module', () => {
    it('should have db.ts file', () => {
      const dbPath = path.join(process.cwd(), 'src', 'db.ts');
      assert.ok(fs.existsSync(dbPath), 'db.ts should exist');
    });

    it('should import pg Pool', () => {
      const dbContent = fs.readFileSync('src/db.ts', 'utf8');
      assert.ok(dbContent.includes("from 'pg'"), 'should import from pg');
      assert.ok(dbContent.includes('Pool'), 'should use Pool');
    });
  });

  describe('Express Server', () => {
    it('should have index.ts file', () => {
      const indexPath = path.join(process.cwd(), 'src', 'index.ts');
      assert.ok(fs.existsSync(indexPath), 'index.ts should exist');
    });

    it('should import express', () => {
      const indexContent = fs.readFileSync('src/index.ts', 'utf8');
      assert.ok(indexContent.includes("import express"), 'should import express');
    });

    it('should have POST /api/shorten endpoint', () => {
      const indexContent = fs.readFileSync('src/index.ts', 'utf8');
      assert.ok(indexContent.includes("app.post('/api/shorten'"), 'should have POST /api/shorten');
    });

    it('should have GET /api/links endpoint', () => {
      const indexContent = fs.readFileSync('src/index.ts', 'utf8');
      assert.ok(indexContent.includes("app.get('/api/links'"), 'should have GET /api/links');
    });

    it('should have GET /api/stats/:code endpoint', () => {
      const indexContent = fs.readFileSync('src/index.ts', 'utf8');
      assert.ok(indexContent.includes("app.get('/api/stats/:code'"), 'should have GET /api/stats/:code');
    });

    it('should have DELETE /api/links/:code endpoint', () => {
      const indexContent = fs.readFileSync('src/index.ts', 'utf8');
      assert.ok(indexContent.includes("app.delete('/api/links/:code'"), 'should have DELETE /api/links/:code');
    });

    it('should have GET /:code redirect endpoint', () => {
      const indexContent = fs.readFileSync('src/index.ts', 'utf8');
      assert.ok(indexContent.includes("app.get('/:code'"), 'should have GET /:code');
    });
  });

  describe('Database Schema', () => {
    it('should have schema.sql file', () => {
      const schemaPath = path.join(process.cwd(), 'schema.sql');
      assert.ok(fs.existsSync(schemaPath), 'schema.sql should exist');
    });

    it('should create short_links table', () => {
      const schemaContent = fs.readFileSync('schema.sql', 'utf8');
      assert.ok(schemaContent.includes('short_links'), 'should reference short_links table');
      assert.ok(schemaContent.includes('code'), 'should have code column');
      assert.ok(schemaContent.includes('url'), 'should have url column');
      assert.ok(schemaContent.includes('clicks'), 'should have clicks column');
    });
  });
});
