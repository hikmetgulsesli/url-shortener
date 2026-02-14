import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';

describe('Project Setup', () => {
  describe('package.json', () => {
    it('should exist', () => {
      const pkgPath = path.join(process.cwd(), 'package.json');
      assert.ok(fs.existsSync(pkgPath), 'package.json should exist');
    });

    it('should have required scripts', () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      assert.ok(pkg.scripts.build, 'should have build script');
      assert.ok(pkg.scripts.start, 'should have start script');
      assert.ok(pkg.scripts.test, 'should have test script');
    });

    it('should have required dependencies', () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      assert.ok(pkg.dependencies.express, 'should have express dependency');
      assert.ok(pkg.dependencies.pg, 'should have pg dependency');
      assert.ok(pkg.dependencies.nanoid, 'should have nanoid dependency');
    });

    it('should have TypeScript devDependencies', () => {
      const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      assert.ok(pkg.devDependencies.typescript, 'should have typescript');
      assert.ok(pkg.devDependencies['@types/express'], 'should have @types/express');
      assert.ok(pkg.devDependencies['@types/node'], 'should have @types/node');
    });
  });

  describe('tsconfig.json', () => {
    it('should exist', () => {
      const tsPath = path.join(process.cwd(), 'tsconfig.json');
      assert.ok(fs.existsSync(tsPath), 'tsconfig.json should exist');
    });

    it('should have correct compiler options', () => {
      const ts = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
      assert.strictEqual(ts.compilerOptions.target, 'ES2020', 'target should be ES2020');
      assert.strictEqual(ts.compilerOptions.module, 'commonjs', 'module should be commonjs');
      assert.strictEqual(ts.compilerOptions.outDir, './dist', 'outDir should be ./dist');
      assert.strictEqual(ts.compilerOptions.rootDir, './src', 'rootDir should be ./src');
      assert.strictEqual(ts.compilerOptions.strict, true, 'strict should be true');
    });
  });

  describe('Directory Structure', () => {
    it('should have src directory', () => {
      const srcPath = path.join(process.cwd(), 'src');
      assert.ok(fs.existsSync(srcPath), 'src directory should exist');
      assert.ok(fs.statSync(srcPath).isDirectory(), 'src should be a directory');
    });

    it('should have public directory', () => {
      const publicPath = path.join(process.cwd(), 'public');
      assert.ok(fs.existsSync(publicPath), 'public directory should exist');
      assert.ok(fs.statSync(publicPath).isDirectory(), 'public should be a directory');
    });
  });
});
