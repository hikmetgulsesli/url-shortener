import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

describe('US-003: DB Connection Module', () => {
  describe('db.ts file', () => {
    it('should exist', () => {
      const dbPath = path.join(process.cwd(), 'src', 'db.ts');
      assert.ok(fs.existsSync(dbPath), 'db.ts should exist');
    });

    it('should import Pool from pg', () => {
      const dbContent = fs.readFileSync('src/db.ts', 'utf8');
      assert.ok(dbContent.includes("import { Pool } from 'pg'"), 'should import Pool from pg');
    });

    it('should create Pool instance', () => {
      const dbContent = fs.readFileSync('src/db.ts', 'utf8');
      assert.ok(dbContent.includes('new Pool'), 'should create new Pool instance');
    });

    it('should use DATABASE_URL from environment', () => {
      const dbContent = fs.readFileSync('src/db.ts', 'utf8');
      assert.ok(dbContent.includes('process.env.DATABASE_URL'), 'should use DATABASE_URL env var');
    });

    it('should pass connectionString to Pool', () => {
      const dbContent = fs.readFileSync('src/db.ts', 'utf8');
      assert.ok(dbContent.includes('connectionString'), 'should pass connectionString option');
    });

    it('should export pool as default', () => {
      const dbContent = fs.readFileSync('src/db.ts', 'utf8');
      assert.ok(dbContent.includes('export default pool'), 'should export pool as default');
    });
  });

  describe('.env configuration', () => {
    it('should have .env file', () => {
      const envPath = path.join(process.cwd(), '.env');
      assert.ok(fs.existsSync(envPath), '.env file should exist');
    });

    it('should contain DATABASE_URL', () => {
      const envContent = fs.readFileSync('.env', 'utf8');
      assert.ok(envContent.includes('DATABASE_URL'), 'should contain DATABASE_URL');
    });

    it('should have valid PostgreSQL connection string format', () => {
      const envContent = fs.readFileSync('.env', 'utf8');
      const dbUrlMatch = envContent.match(/DATABASE_URL=(.+)/);
      assert.ok(dbUrlMatch, 'should have DATABASE_URL value');
      const dbUrl = dbUrlMatch[1];
      assert.ok(dbUrl.startsWith('postgresql://'), 'should start with postgresql://');
    });
  });
});
