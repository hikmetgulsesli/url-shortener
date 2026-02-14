"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
(0, node_test_1.describe)('Project Setup', () => {
    (0, node_test_1.describe)('package.json', () => {
        (0, node_test_1.it)('should exist', () => {
            const pkgPath = path_1.default.join(process.cwd(), 'package.json');
            node_assert_1.default.ok(fs_1.default.existsSync(pkgPath), 'package.json should exist');
        });
        (0, node_test_1.it)('should have required scripts', () => {
            const pkg = JSON.parse(fs_1.default.readFileSync('package.json', 'utf8'));
            node_assert_1.default.ok(pkg.scripts.build, 'should have build script');
            node_assert_1.default.ok(pkg.scripts.start, 'should have start script');
            node_assert_1.default.ok(pkg.scripts.test, 'should have test script');
        });
        (0, node_test_1.it)('should have required dependencies', () => {
            const pkg = JSON.parse(fs_1.default.readFileSync('package.json', 'utf8'));
            node_assert_1.default.ok(pkg.dependencies.express, 'should have express dependency');
            node_assert_1.default.ok(pkg.dependencies.pg, 'should have pg dependency');
            node_assert_1.default.ok(pkg.dependencies.nanoid, 'should have nanoid dependency');
        });
        (0, node_test_1.it)('should have TypeScript devDependencies', () => {
            const pkg = JSON.parse(fs_1.default.readFileSync('package.json', 'utf8'));
            node_assert_1.default.ok(pkg.devDependencies.typescript, 'should have typescript');
            node_assert_1.default.ok(pkg.devDependencies['@types/express'], 'should have @types/express');
            node_assert_1.default.ok(pkg.devDependencies['@types/node'], 'should have @types/node');
        });
    });
    (0, node_test_1.describe)('tsconfig.json', () => {
        (0, node_test_1.it)('should exist', () => {
            const tsPath = path_1.default.join(process.cwd(), 'tsconfig.json');
            node_assert_1.default.ok(fs_1.default.existsSync(tsPath), 'tsconfig.json should exist');
        });
        (0, node_test_1.it)('should have correct compiler options', () => {
            const ts = JSON.parse(fs_1.default.readFileSync('tsconfig.json', 'utf8'));
            node_assert_1.default.strictEqual(ts.compilerOptions.target, 'ES2020', 'target should be ES2020');
            node_assert_1.default.strictEqual(ts.compilerOptions.module, 'commonjs', 'module should be commonjs');
            node_assert_1.default.strictEqual(ts.compilerOptions.outDir, './dist', 'outDir should be ./dist');
            node_assert_1.default.strictEqual(ts.compilerOptions.rootDir, './src', 'rootDir should be ./src');
            node_assert_1.default.strictEqual(ts.compilerOptions.strict, true, 'strict should be true');
        });
    });
    (0, node_test_1.describe)('Directory Structure', () => {
        (0, node_test_1.it)('should have src directory', () => {
            const srcPath = path_1.default.join(process.cwd(), 'src');
            node_assert_1.default.ok(fs_1.default.existsSync(srcPath), 'src directory should exist');
            node_assert_1.default.ok(fs_1.default.statSync(srcPath).isDirectory(), 'src should be a directory');
        });
        (0, node_test_1.it)('should have public directory', () => {
            const publicPath = path_1.default.join(process.cwd(), 'public');
            node_assert_1.default.ok(fs_1.default.existsSync(publicPath), 'public directory should exist');
            node_assert_1.default.ok(fs_1.default.statSync(publicPath).isDirectory(), 'public should be a directory');
        });
    });
});
//# sourceMappingURL=setup.test.js.map