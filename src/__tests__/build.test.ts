import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

describe('US-017: Build script and production build', () => {
  it('should have package.json with build script', () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    assert.ok(pkg.scripts.build, 'should have build script');
    assert.ok(pkg.scripts.build.includes('tsc'), 'build script should run tsc');
  });

  it('should have package.json with start script', () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    assert.ok(pkg.scripts.start, 'should have start script');
    assert.ok(pkg.scripts.start.includes('node'), 'start script should run node');
  });

  it('should have tsconfig.json', () => {
    const tsPath = path.join(process.cwd(), 'tsconfig.json');
    assert.ok(fs.existsSync(tsPath), 'tsconfig.json should exist');
  });

  it('should have outDir set to dist in tsconfig', () => {
    const ts = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
    assert.strictEqual(ts.compilerOptions.outDir, './dist', 'outDir should be ./dist');
  });

  it('should have rootDir set to src in tsconfig', () => {
    const ts = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
    assert.strictEqual(ts.compilerOptions.rootDir, './src', 'rootDir should be ./src');
  });

  it('should have dist directory after build', () => {
    const distPath = path.join(process.cwd(), 'dist');
    assert.ok(fs.existsSync(distPath), 'dist directory should exist');
    assert.ok(fs.statSync(distPath).isDirectory(), 'dist should be a directory');
  });

  it('should have compiled index.js in dist', () => {
    const indexPath = path.join(process.cwd(), 'dist', 'index.js');
    assert.ok(fs.existsSync(indexPath), 'dist/index.js should exist');
  });

  it('should have compiled db.js in dist', () => {
    const dbPath = path.join(process.cwd(), 'dist', 'db.js');
    assert.ok(fs.existsSync(dbPath), 'dist/db.js should exist');
  });

  it('should have test script in package.json', () => {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    assert.ok(pkg.scripts.test, 'should have test script');
  });
});
