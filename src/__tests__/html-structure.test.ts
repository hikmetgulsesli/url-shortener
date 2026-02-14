import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

describe('US-010: Frontend HTML structure with Tailwind CSS', () => {
  const htmlContent = fs.readFileSync('public/index.html', 'utf8');

  it('should have index.html in public folder', () => {
    const htmlPath = path.join(process.cwd(), 'public', 'index.html');
    assert.ok(fs.existsSync(htmlPath), 'public/index.html should exist');
  });

  it('should have HTML5 doctype', () => {
    assert.ok(htmlContent.includes('<!DOCTYPE html>'), 'should have HTML5 doctype');
  });

  it('should have html tag with lang attribute', () => {
    assert.ok(htmlContent.includes('<html lang="tr">'), 'should have html tag with lang="tr"');
  });

  it('should have head section with meta charset', () => {
    assert.ok(htmlContent.includes('<head>'), 'should have head section');
    assert.ok(htmlContent.includes('charset="UTF-8"'), 'should have UTF-8 charset');
  });

  it('should have viewport meta tag', () => {
    assert.ok(htmlContent.includes('viewport'), 'should have viewport meta tag');
    assert.ok(htmlContent.includes('width=device-width'), 'should have width=device-width');
  });

  it('should include Tailwind CSS from CDN', () => {
    assert.ok(htmlContent.includes('tailwindcss'), 'should reference Tailwind CSS');
    assert.ok(htmlContent.includes('cdn.tailwindcss.com'), 'should use Tailwind CDN');
  });

  it('should have dark theme body', () => {
    assert.ok(htmlContent.includes('bg-gray-900'), 'should have dark background');
    assert.ok(htmlContent.includes('text-white'), 'should have white text');
  });

  it('should have container with max width', () => {
    assert.ok(htmlContent.includes('container'), 'should have container class');
    assert.ok(htmlContent.includes('max-w-4xl'), 'should have max width');
  });

  it('should have title', () => {
    assert.ok(htmlContent.includes('<title>'), 'should have title tag');
    assert.ok(htmlContent.includes('URL Shortener'), 'should have URL Shortener title');
  });

  it('should have main heading', () => {
    assert.ok(htmlContent.includes('<h1'), 'should have h1 heading');
    assert.ok(htmlContent.includes('URL Shortener'), 'should have URL Shortener heading');
  });
});
