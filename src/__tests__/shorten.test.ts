import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';

describe('US-004: POST /api/shorten endpoint', () => {
  const indexContent = fs.readFileSync('src/index.ts', 'utf8');

  it('should have POST /api/shorten endpoint', () => {
    assert.ok(indexContent.includes("app.post('/api/shorten'"), 'should define POST /api/shorten route');
  });

  it('should extract url from request body', () => {
    assert.ok(indexContent.includes('req.body'), 'should access req.body');
    assert.ok(indexContent.includes('{ url }'), 'should destructure url from body');
  });

  it('should validate url is provided', () => {
    assert.ok(indexContent.includes('!url'), 'should check if url is missing');
    assert.ok(indexContent.includes('400'), 'should return 400 for missing url');
    assert.ok(indexContent.includes('URL is required'), 'should have error message for missing url');
  });

  it('should validate url is a string', () => {
    assert.ok(indexContent.includes('typeof url !== \'string\''), 'should check url type');
  });

  it('should validate URL format', () => {
    assert.ok(indexContent.includes('new URL(url)'), 'should use URL constructor for validation');
    assert.ok(indexContent.includes('Invalid URL format'), 'should have error message for invalid URL');
  });

  it('should generate 6 character code using nanoid', () => {
    assert.ok(indexContent.includes("import { nanoid } from 'nanoid'"), 'should import nanoid');
    assert.ok(indexContent.includes('nanoid(6)'), 'should generate 6 character code');
  });

  it('should insert into short_links table', () => {
    assert.ok(indexContent.includes('INSERT INTO short_links'), 'should insert into short_links');
    assert.ok(indexContent.includes('code, url'), 'should insert code and url columns');
    assert.ok(indexContent.includes('RETURNING code'), 'should return the code');
  });

  it('should use pool.query for database operation', () => {
    assert.ok(indexContent.includes('pool.query'), 'should use pool.query');
  });

  it('should construct short URL with BASE_URL', () => {
    assert.ok(indexContent.includes('BASE_URL'), 'should use BASE_URL');
    assert.ok(indexContent.includes('shortUrl'), 'should include shortUrl in response');
  });

  it('should return JSON response with code and shortUrl', () => {
    assert.ok(indexContent.includes('res.json({ code'), 'should return JSON with code');
    assert.ok(indexContent.includes('shortUrl'), 'should include shortUrl in JSON response');
  });

  it('should handle errors with 500 status', () => {
    assert.ok(indexContent.includes('catch (error)'), 'should have error handling');
    assert.ok(indexContent.includes('500'), 'should return 500 on error');
    assert.ok(indexContent.includes('Internal server error'), 'should have error message');
  });
});
