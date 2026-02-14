import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';

describe('US-012: Links table in frontend', () => {
  const htmlContent = fs.readFileSync('public/index.html', 'utf8');

  it('should have links table element', () => {
    assert.ok(htmlContent.includes('id="linksTable"'), 'should have linksTable element');
    assert.ok(htmlContent.includes('<table'), 'should have table element');
  });

  it('should have table headers for code, url, clicks, date', () => {
    assert.ok(htmlContent.includes('Kod') || htmlContent.includes('code'), 'should have code header');
    assert.ok(htmlContent.includes('URL') || htmlContent.includes('url'), 'should have URL header');
    assert.ok(htmlContent.includes('Tıklama') || htmlContent.includes('clicks'), 'should have clicks header');
    assert.ok(htmlContent.includes('Tarih') || htmlContent.includes('date'), 'should have date header');
  });

  it('should have tbody for dynamic content', () => {
    assert.ok(htmlContent.includes('<tbody'), 'should have tbody element');
  });

  it('should fetch links from /api/links endpoint', () => {
    assert.ok(htmlContent.includes("fetch('/api/links'"), 'should fetch from /api/links');
  });

  it('should have loadLinks function', () => {
    assert.ok(htmlContent.includes('async function loadLinks'), 'should have loadLinks function');
  });

  it('should display code as clickable link', () => {
    assert.ok(htmlContent.includes('link.code'), 'should reference link.code');
    assert.ok(htmlContent.includes('target="_blank"'), 'should open links in new tab');
  });

  it('should display original URL', () => {
    assert.ok(htmlContent.includes('link.url'), 'should reference link.url');
  });

  it('should display click count', () => {
    assert.ok(htmlContent.includes('link.clicks'), 'should reference link.clicks');
  });

  it('should display creation date', () => {
    assert.ok(htmlContent.includes('link.created_at'), 'should reference link.created_at');
    assert.ok(htmlContent.includes('toLocaleDateString'), 'should format date');
  });

  it('should auto-refresh links periodically', () => {
    assert.ok(htmlContent.includes('setInterval'), 'should use setInterval for auto-refresh');
    assert.ok(htmlContent.includes('loadLinks'), 'should call loadLinks in interval');
  });
});
