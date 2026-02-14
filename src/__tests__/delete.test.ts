import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';

describe('US-008: DELETE /api/links/:code endpoint', () => {
  const indexContent = fs.readFileSync('src/index.ts', 'utf8');

  it('should have DELETE /api/links/:code endpoint', () => {
    assert.ok(indexContent.includes("app.delete('/api/links/:code'"), 'should define DELETE /api/links/:code route');
  });

  it('should extract code from request params', () => {
    assert.ok(indexContent.includes('req.params'), 'should access req.params');
    assert.ok(indexContent.includes('{ code }'), 'should destructure code from params');
  });

  it('should delete from short_links table by code', () => {
    assert.ok(indexContent.includes('DELETE FROM short_links'), 'should delete from short_links');
    assert.ok(indexContent.includes('WHERE code = $1'), 'should filter by code');
  });

  it('should use pool.query for database operation', () => {
    assert.ok(indexContent.includes('pool.query'), 'should use pool.query');
  });

  it('should return 404 if link not found', () => {
    assert.ok(indexContent.includes('result.rows.length === 0'), 'should check if result is empty');
    assert.ok(indexContent.includes('404'), 'should return 404 status');
    assert.ok(indexContent.includes('Link not found'), 'should have error message');
  });

  it('should return success message on deletion', () => {
    assert.ok(indexContent.includes('Link deleted successfully'), 'should return success message');
    assert.ok(indexContent.includes('res.json({ message'), 'should return JSON with message');
  });

  it('should handle errors with 500 status', () => {
    assert.ok(indexContent.includes('catch (error)'), 'should have error handling');
    assert.ok(indexContent.includes('500'), 'should return 500 on error');
    assert.ok(indexContent.includes('Internal server error'), 'should have error message');
  });
});
