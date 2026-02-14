import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';

describe('US-011: URL shorten form in frontend', () => {
  const htmlContent = fs.readFileSync('public/index.html', 'utf8');

  it('should have URL input field', () => {
    assert.ok(htmlContent.includes('id="urlInput"'), 'should have urlInput element');
    assert.ok(htmlContent.includes('type="url"'), 'should have url type input');
    assert.ok(htmlContent.includes('placeholder='), 'should have placeholder');
  });

  it('should have shorten button', () => {
    assert.ok(htmlContent.includes('id="shortenBtn"'), 'should have shortenBtn element');
    assert.ok(htmlContent.includes('Kısalt'), 'should have Kısalt button text');
  });

  it('should have result display area', () => {
    assert.ok(htmlContent.includes('id="result"'), 'should have result element');
    assert.ok(htmlContent.includes('id="shortUrl"'), 'should have shortUrl element');
  });

  it('should have copy button', () => {
    assert.ok(htmlContent.includes('id="copyBtn"'), 'should have copyBtn element');
    assert.ok(htmlContent.includes('Kopyala'), 'should have Kopyala button text');
  });

  it('should have error message display', () => {
    assert.ok(htmlContent.includes('id="errorMsg"'), 'should have errorMsg element');
  });

  it('should have event listener for shorten button', () => {
    assert.ok(htmlContent.includes('shortenBtn.addEventListener'), 'should have shorten button listener');
    assert.ok(htmlContent.includes('click'), 'should listen for click event');
  });

  it('should fetch from /api/shorten endpoint', () => {
    assert.ok(htmlContent.includes("fetch('/api/shorten'"), 'should fetch from /api/shorten');
    assert.ok(htmlContent.includes('method: \'POST\''), 'should use POST method');
  });

  it('should handle Enter key press', () => {
    assert.ok(htmlContent.includes('keypress') || htmlContent.includes('keydown') || htmlContent.includes('keyup'), 
      'should have key event listener');
    assert.ok(htmlContent.includes('Enter'), 'should check for Enter key');
  });

  it('should use clipboard API for copy', () => {
    assert.ok(htmlContent.includes('navigator.clipboard.writeText'), 'should use clipboard API');
  });

  it('should validate URL before submitting', () => {
    assert.ok(htmlContent.includes('.trim()'), 'should trim URL input');
    assert.ok(htmlContent.includes('!url'), 'should check if url is empty');
  });
});
