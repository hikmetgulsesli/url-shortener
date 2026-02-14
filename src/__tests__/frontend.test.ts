import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

describe('Frontend Implementation', () => {
  describe('HTML Structure', () => {
    it('should have index.html file', () => {
      const htmlPath = path.join(process.cwd(), 'public', 'index.html');
      assert.ok(fs.existsSync(htmlPath), 'index.html should exist');
    });

    it('should include Tailwind CSS', () => {
      const htmlContent = fs.readFileSync('public/index.html', 'utf8');
      assert.ok(htmlContent.includes('tailwindcss'), 'should include Tailwind CSS');
    });

    it('should have URL input field', () => {
      const htmlContent = fs.readFileSync('public/index.html', 'utf8');
      assert.ok(htmlContent.includes('urlInput'), 'should have urlInput element');
      assert.ok(htmlContent.includes('type="url"'), 'should have URL type input');
    });

    it('should have shorten button', () => {
      const htmlContent = fs.readFileSync('public/index.html', 'utf8');
      assert.ok(htmlContent.includes('shortenBtn'), 'should have shortenBtn element');
      assert.ok(htmlContent.includes('Kısalt'), 'should have Kısalt button text');
    });

    it('should have copy button', () => {
      const htmlContent = fs.readFileSync('public/index.html', 'utf8');
      assert.ok(htmlContent.includes('copyBtn'), 'should have copyBtn element');
      assert.ok(htmlContent.includes('Kopyala'), 'should have Kopyala button text');
    });

    it('should have links table', () => {
      const htmlContent = fs.readFileSync('public/index.html', 'utf8');
      assert.ok(htmlContent.includes('linksTable'), 'should have linksTable element');
      assert.ok(htmlContent.includes('<table'), 'should have table element');
    });
  });

  describe('JavaScript Functionality', () => {
    it('should have fetch call to /api/shorten', () => {
      const htmlContent = fs.readFileSync('public/index.html', 'utf8');
      assert.ok(htmlContent.includes("/api/shorten"), 'should call /api/shorten endpoint');
    });

    it('should have fetch call to /api/links', () => {
      const htmlContent = fs.readFileSync('public/index.html', 'utf8');
      assert.ok(htmlContent.includes("/api/links"), 'should call /api/links endpoint');
    });

    it('should handle copy to clipboard', () => {
      const htmlContent = fs.readFileSync('public/index.html', 'utf8');
      assert.ok(htmlContent.includes('clipboard.writeText'), 'should use clipboard API');
    });
  });
});
