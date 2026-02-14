import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';

describe('US-006: GET /api/links endpoint', () => {
  const indexContent = fs.readFileSync('src/index.ts', 'utf8');

  it('should have GET /api/links endpoint', () => {
    assert.ok(indexContent.includes("app.get('/api/links'"), 'should define GET /api/links route');
  });

  it('should query short_links table', () => {
    assert.ok(indexContent.includes('SELECT id, code, url, clicks, created_at FROM short_links'), 
      'should select all required columns');
  });

  it('should order by created_at descending', () => {
    assert.ok(indexContent.includes('ORDER BY created_at DESC'), 'should order by created_at DESC');
  });

  it('should limit to 50 results', () => {
    assert.ok(indexContent.includes('LIMIT 50'), 'should limit to 50 results');
  });

  it('should use pool.query for database operation', () => {
    assert.ok(indexContent.includes('pool.query'), 'should use pool.query');
  });

  it('should return JSON array response', () => {
    assert.ok(indexContent.includes('res.json(result.rows)'), 'should return result.rows as JSON');
  });

  it('should handle errors with 500 status', () => {
    assert.ok(indexContent.includes('catch (error)'), 'should have error handling');
    assert.ok(indexContent.includes('500'), 'should return 500 on error');
    assert.ok(indexContent.includes('Internal server error'), 'should have error message');
  });
});
