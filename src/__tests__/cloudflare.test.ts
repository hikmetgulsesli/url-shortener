import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

describe('US-015: Configure Cloudflare tunnel', () => {
  it('should have cloudflared.yml file', () => {
    const configPath = path.join(process.cwd(), 'cloudflared.yml');
    assert.ok(fs.existsSync(configPath), 'cloudflared.yml should exist');
  });

  it('should have tunnel name', () => {
    const configContent = fs.readFileSync('cloudflared.yml', 'utf8');
    assert.ok(configContent.includes('tunnel:'), 'should have tunnel field');
    assert.ok(configContent.includes('url-shortener-tunnel'), 'should have tunnel name');
  });

  it('should have credentials-file path', () => {
    const configContent = fs.readFileSync('cloudflared.yml', 'utf8');
    assert.ok(configContent.includes('credentials-file:'), 'should have credentials-file');
  });

  it('should have ingress rules', () => {
    const configContent = fs.readFileSync('cloudflared.yml', 'utf8');
    assert.ok(configContent.includes('ingress:'), 'should have ingress section');
  });

  it('should have hostname for link.setrox.com.tr', () => {
    const configContent = fs.readFileSync('cloudflared.yml', 'utf8');
    assert.ok(configContent.includes('hostname:'), 'should have hostname');
    assert.ok(configContent.includes('link.setrox.com.tr'), 'should have link.setrox.com.tr');
  });

  it('should route to localhost:3510', () => {
    const configContent = fs.readFileSync('cloudflared.yml', 'utf8');
    assert.ok(configContent.includes('service:'), 'should have service');
    assert.ok(configContent.includes('localhost:3510'), 'should route to localhost:3510');
  });

  it('should have catch-all 404 service', () => {
    const configContent = fs.readFileSync('cloudflared.yml', 'utf8');
    assert.ok(configContent.includes('http_status:404'), 'should have 404 catch-all');
  });
});
