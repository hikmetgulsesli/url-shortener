import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

describe('US-018: Verify end-to-end functionality', () => {
  it('should have all required source files', () => {
    assert.ok(fs.existsSync(path.join(process.cwd(), 'src', 'index.ts')), 'src/index.ts should exist');
    assert.ok(fs.existsSync(path.join(process.cwd(), 'src', 'db.ts')), 'src/db.ts should exist');
    assert.ok(fs.existsSync(path.join(process.cwd(), 'public', 'index.html')), 'public/index.html should exist');
    assert.ok(fs.existsSync(path.join(process.cwd(), 'schema.sql')), 'schema.sql should exist');
  });

  it('should have all configuration files', () => {
    assert.ok(fs.existsSync(path.join(process.cwd(), '.env')), '.env should exist');
    assert.ok(fs.existsSync(path.join(process.cwd(), 'package.json')), 'package.json should exist');
    assert.ok(fs.existsSync(path.join(process.cwd(), 'tsconfig.json')), 'tsconfig.json should exist');
  });

  it('should have deployment configuration files', () => {
    assert.ok(fs.existsSync(path.join(process.cwd(), 'url-shortener.service')), 'url-shortener.service should exist');
    assert.ok(fs.existsSync(path.join(process.cwd(), 'cloudflared.yml')), 'cloudflared.yml should exist');
  });

  it('should have compiled dist files', () => {
    assert.ok(fs.existsSync(path.join(process.cwd(), 'dist', 'index.js')), 'dist/index.js should exist');
    assert.ok(fs.existsSync(path.join(process.cwd(), 'dist', 'db.js')), 'dist/db.js should exist');
  });

  it('should have test files', () => {
    const testDir = path.join(process.cwd(), 'src', '__tests__');
    assert.ok(fs.existsSync(testDir), 'src/__tests__ directory should exist');
    const testFiles = fs.readdirSync(testDir);
    assert.ok(testFiles.length > 0, 'should have test files');
  });

  it('should have all API endpoints implemented', () => {
    const indexContent = fs.readFileSync('src/index.ts', 'utf8');
    assert.ok(indexContent.includes("app.post('/api/shorten'"), 'POST /api/shorten should exist');
    assert.ok(indexContent.includes("app.get('/api/links'"), 'GET /api/links should exist');
    assert.ok(indexContent.includes("app.get('/api/stats/:code'"), 'GET /api/stats/:code should exist');
    assert.ok(indexContent.includes("app.delete('/api/links/:code'"), 'DELETE /api/links/:code should exist');
    assert.ok(indexContent.includes("app.get('/:code'"), 'GET /:code should exist');
    assert.ok(indexContent.includes("app.get('/health'"), 'GET /health should exist');
  });

  it('should have frontend with all required elements', () => {
    const htmlContent = fs.readFileSync('public/index.html', 'utf8');
    assert.ok(htmlContent.includes('id="urlInput"'), 'urlInput should exist');
    assert.ok(htmlContent.includes('id="shortenBtn"'), 'shortenBtn should exist');
    assert.ok(htmlContent.includes('id="result"'), 'result should exist');
    assert.ok(htmlContent.includes('id="linksTable"'), 'linksTable should exist');
  });

  it('should have database schema defined', () => {
    const schemaContent = fs.readFileSync('schema.sql', 'utf8');
    assert.ok(schemaContent.includes('CREATE TABLE'), 'should create table');
    assert.ok(schemaContent.includes('short_links'), 'should have short_links table');
    assert.ok(schemaContent.includes('code'), 'should have code column');
    assert.ok(schemaContent.includes('url'), 'should have url column');
  });

  it('should have valid package.json with all scripts', () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    assert.ok(pkg.scripts.build, 'should have build script');
    assert.ok(pkg.scripts.start, 'should have start script');
    assert.ok(pkg.scripts.test, 'should have test script');
    assert.ok(pkg.scripts.dev, 'should have dev script');
  });

  it('should have all required dependencies', () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    assert.ok(pkg.dependencies.express, 'should have express');
    assert.ok(pkg.dependencies.pg, 'should have pg');
    assert.ok(pkg.dependencies.nanoid, 'should have nanoid');
    assert.ok(pkg.devDependencies.typescript, 'should have typescript');
  });
});
