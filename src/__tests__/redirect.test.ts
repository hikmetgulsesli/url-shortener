import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';

describe('US-005: GET /:code redirect endpoint', () => {
  const indexContent = fs.readFileSync('src/index.ts', 'utf8');

  it('should have GET /:code endpoint', () => {
    assert.ok(indexContent.includes("app.get('/:code'"), 'should define GET /:code route');
  });

  it('should extract code from request params', () => {
    assert.ok(indexContent.includes('req.params'), 'should access req.params');
    assert.ok(indexContent.includes('{ code }'), 'should destructure code from params');
  });

  it('should skip API routes', () => {
    assert.ok(indexContent.includes('api/') || indexContent.includes('code.startsWith'), 'should check for api routes');
    assert.ok(indexContent.includes('404'), 'should return 404 for API routes');
  });

  it('should update clicks counter in database', () => {
    assert.ok(indexContent.includes('UPDATE short_links'), 'should update short_links');
    assert.ok(indexContent.includes('clicks = clicks + 1'), 'should increment clicks');
    assert.ok(indexContent.includes('SET clicks'), 'should use SET clicks');
  });

  it('should use pool.query for database operation', () => {
    assert.ok(indexContent.includes('pool.query'), 'should use pool.query');
  });

  it('should return 404 if link not found', () => {
    assert.ok(indexContent.includes('result.rows.length === 0'), 'should check if result is empty');
    assert.ok(indexContent.includes('404'), 'should return 404 status');
  });

  it('should redirect to original URL with 302', () => {
    assert.ok(indexContent.includes('res.redirect'), 'should call res.redirect');
    assert.ok(indexContent.includes('302'), 'should use 302 status code');
    assert.ok(indexContent.includes('result.rows[0].url'), 'should redirect to original url');
  });

  it('should handle errors with 500 status', () => {
    assert.ok(indexContent.includes('catch (error)'), 'should have error handling');
    assert.ok(indexContent.includes('500'), 'should return 500 on error');
  });
});
