import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';

describe('US-013: Wire up frontend to backend API', () => {
  const htmlContent = fs.readFileSync('public/index.html', 'utf8');

  it('should have fetch API calls to backend', () => {
    assert.ok(htmlContent.includes('fetch('), 'should use fetch API');
    assert.ok(htmlContent.includes("'/api/shorten'"), 'should call /api/shorten');
    assert.ok(htmlContent.includes("'/api/links'"), 'should call /api/links');
  });

  it('should use POST method for shorten', () => {
    assert.ok(htmlContent.includes('method: \'POST\''), 'should use POST for shorten');
  });

  it('should set Content-Type header to JSON', () => {
    assert.ok(htmlContent.includes('Content-Type'), 'should set Content-Type header');
    assert.ok(htmlContent.includes('application/json'), 'should use application/json');
  });

  it('should stringify request body', () => {
    assert.ok(htmlContent.includes('JSON.stringify'), 'should stringify request body');
  });

  it('should parse JSON response', () => {
    assert.ok(htmlContent.includes('.json()'), 'should parse JSON response');
  });

  it('should handle fetch errors', () => {
    assert.ok(htmlContent.includes('try') && htmlContent.includes('catch'), 'should have try-catch');
    assert.ok(htmlContent.includes('error'), 'should handle errors');
  });

  it('should update UI after successful shorten', () => {
    assert.ok(htmlContent.includes('shortUrlEl.textContent') || htmlContent.includes('shortUrl.textContent'), 
      'should update shortUrl text');
    assert.ok(htmlContent.includes('result.classList.remove'), 'should show result');
  });

  it('should refresh links table after new link created', () => {
    assert.ok(htmlContent.includes('loadLinks()'), 'should call loadLinks after shorten');
  });

  it('should use window.location.origin for links', () => {
    assert.ok(htmlContent.includes('window.location.origin'), 'should use window.location.origin');
  });

  it('should handle 404 responses', () => {
    assert.ok(htmlContent.includes('!response.ok') || htmlContent.includes('404'), 
      'should handle error responses');
  });
});
