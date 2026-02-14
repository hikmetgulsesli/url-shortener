import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

describe('US-016: Create .env configuration file', () => {
  it('should have .env file', () => {
    const envPath = path.join(process.cwd(), '.env');
    assert.ok(fs.existsSync(envPath), '.env file should exist');
  });

  it('should have DATABASE_URL', () => {
    const envContent = fs.readFileSync('.env', 'utf8');
    assert.ok(envContent.includes('DATABASE_URL='), 'should have DATABASE_URL');
  });

  it('should have valid PostgreSQL DATABASE_URL format', () => {
    const envContent = fs.readFileSync('.env', 'utf8');
    const dbUrlMatch = envContent.match(/DATABASE_URL=(.+)/);
    assert.ok(dbUrlMatch, 'should have DATABASE_URL value');
    const dbUrl = dbUrlMatch[1];
    assert.ok(dbUrl.startsWith('postgresql://'), 'should start with postgresql://');
    assert.ok(dbUrl.includes('@'), 'should have @ for credentials');
    assert.ok(dbUrl.includes('/'), 'should have / for database name');
  });

  it('should have PORT', () => {
    const envContent = fs.readFileSync('.env', 'utf8');
    assert.ok(envContent.includes('PORT='), 'should have PORT');
  });

  it('should have PORT set to 3510', () => {
    const envContent = fs.readFileSync('.env', 'utf8');
    const portMatch = envContent.match(/PORT=(\d+)/);
    assert.ok(portMatch, 'should have PORT value');
    assert.strictEqual(portMatch[1], '3510', 'PORT should be 3510');
  });

  it('should have BASE_URL', () => {
    const envContent = fs.readFileSync('.env', 'utf8');
    assert.ok(envContent.includes('BASE_URL='), 'should have BASE_URL');
  });

  it('should have valid BASE_URL format', () => {
    const envContent = fs.readFileSync('.env', 'utf8');
    const baseUrlMatch = envContent.match(/BASE_URL=(https?:\/\/[^\n]+)/);
    assert.ok(baseUrlMatch, 'should have BASE_URL value');
    const baseUrl = baseUrlMatch[1];
    assert.ok(baseUrl.startsWith('https://'), 'should start with https://');
    assert.ok(baseUrl.includes('link.setrox.com.tr'), 'should have link.setrox.com.tr');
  });
});
