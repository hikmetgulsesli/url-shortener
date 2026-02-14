import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

describe('US-014: Configure systemd service', () => {
  it('should have url-shortener.service file', () => {
    const servicePath = path.join(process.cwd(), 'url-shortener.service');
    assert.ok(fs.existsSync(servicePath), 'url-shortener.service should exist');
  });

  it('should have Unit section with Description', () => {
    const serviceContent = fs.readFileSync('url-shortener.service', 'utf8');
    assert.ok(serviceContent.includes('[Unit]'), 'should have Unit section');
    assert.ok(serviceContent.includes('Description='), 'should have Description');
    assert.ok(serviceContent.includes('URL Shortener'), 'should mention URL Shortener');
  });

  it('should have Service section', () => {
    const serviceContent = fs.readFileSync('url-shortener.service', 'utf8');
    assert.ok(serviceContent.includes('[Service]'), 'should have Service section');
  });

  it('should set Type to simple', () => {
    const serviceContent = fs.readFileSync('url-shortener.service', 'utf8');
    assert.ok(serviceContent.includes('Type=simple'), 'should set Type=simple');
  });

  it('should set WorkingDirectory', () => {
    const serviceContent = fs.readFileSync('url-shortener.service', 'utf8');
    assert.ok(serviceContent.includes('WorkingDirectory='), 'should set WorkingDirectory');
    assert.ok(serviceContent.includes('url-shortener'), 'should reference url-shortener directory');
  });

  it('should set ExecStart to node dist/index.js', () => {
    const serviceContent = fs.readFileSync('url-shortener.service', 'utf8');
    assert.ok(serviceContent.includes('ExecStart='), 'should have ExecStart');
    assert.ok(serviceContent.includes('dist/index.js'), 'should run dist/index.js');
  });

  it('should have EnvironmentFile pointing to .env', () => {
    const serviceContent = fs.readFileSync('url-shortener.service', 'utf8');
    assert.ok(serviceContent.includes('EnvironmentFile='), 'should have EnvironmentFile');
    assert.ok(serviceContent.includes('.env'), 'should reference .env file');
  });

  it('should have restart policy', () => {
    const serviceContent = fs.readFileSync('url-shortener.service', 'utf8');
    assert.ok(serviceContent.includes('Restart='), 'should have Restart policy');
  });

  it('should have Install section with WantedBy', () => {
    const serviceContent = fs.readFileSync('url-shortener.service', 'utf8');
    assert.ok(serviceContent.includes('[Install]'), 'should have Install section');
    assert.ok(serviceContent.includes('WantedBy='), 'should have WantedBy');
  });
});
