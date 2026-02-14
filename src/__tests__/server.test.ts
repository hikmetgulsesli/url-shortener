import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';

describe('US-009: Express server entry point', () => {
  const indexContent = fs.readFileSync('src/index.ts', 'utf8');

  it('should have index.ts as entry point', () => {
    const fs = require('fs');
    const path = require('path');
    const indexPath = path.join(process.cwd(), 'src', 'index.ts');
    assert.ok(fs.existsSync(indexPath), 'src/index.ts should exist');
  });

  it('should import express', () => {
    assert.ok(indexContent.includes("import express"), 'should import express');
    assert.ok(indexContent.includes("from 'express'"), 'should import from express');
  });

  it('should create express app', () => {
    assert.ok(indexContent.includes('const app = express()'), 'should create express app');
  });

  it('should use express.json middleware', () => {
    assert.ok(indexContent.includes('app.use(express.json())'), 'should use json middleware');
  });

  it('should use express.static for public files', () => {
    assert.ok(indexContent.includes('express.static'), 'should use static middleware');
    assert.ok(indexContent.includes("'../public'"), 'should serve public directory');
  });

  it('should configure PORT from environment', () => {
    assert.ok(indexContent.includes('process.env.PORT'), 'should use PORT env var');
    assert.ok(indexContent.includes('|| 3510'), 'should have default port 3510');
  });

  it('should configure BASE_URL from environment', () => {
    assert.ok(indexContent.includes('process.env.BASE_URL'), 'should use BASE_URL env var');
  });

  it('should have health check endpoint', () => {
    assert.ok(indexContent.includes("app.get('/health'"), 'should have health endpoint');
    assert.ok(indexContent.includes('status: \'ok\''), 'should return ok status');
  });

  it('should start server with app.listen', () => {
    assert.ok(indexContent.includes('app.listen'), 'should call app.listen');
    assert.ok(indexContent.includes('console.log'), 'should log server start');
  });

  it('should have all API endpoints defined', () => {
    assert.ok(indexContent.includes("app.post('/api/shorten'"), 'should have shorten endpoint');
    assert.ok(indexContent.includes("app.get('/api/links'"), 'should have links endpoint');
    assert.ok(indexContent.includes("app.get('/api/stats/:code'"), 'should have stats endpoint');
    assert.ok(indexContent.includes("app.delete('/api/links/:code'"), 'should have delete endpoint');
    assert.ok(indexContent.includes("app.get('/:code'"), 'should have redirect endpoint');
  });
});
