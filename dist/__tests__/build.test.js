"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
(0, node_test_1.describe)('US-017: Build script and production build', () => {
    (0, node_test_1.it)('should have package.json with build script', () => {
        const pkg = JSON.parse(fs_1.default.readFileSync('package.json', 'utf8'));
        node_assert_1.default.ok(pkg.scripts.build, 'should have build script');
        node_assert_1.default.ok(pkg.scripts.build.includes('tsc'), 'build script should run tsc');
    });
    (0, node_test_1.it)('should have package.json with start script', () => {
        const pkg = JSON.parse(fs_1.default.readFileSync('package.json', 'utf8'));
        node_assert_1.default.ok(pkg.scripts.start, 'should have start script');
        node_assert_1.default.ok(pkg.scripts.start.includes('node'), 'start script should run node');
    });
    (0, node_test_1.it)('should have tsconfig.json', () => {
        const tsPath = path_1.default.join(process.cwd(), 'tsconfig.json');
        node_assert_1.default.ok(fs_1.default.existsSync(tsPath), 'tsconfig.json should exist');
    });
    (0, node_test_1.it)('should have outDir set to dist in tsconfig', () => {
        const ts = JSON.parse(fs_1.default.readFileSync('tsconfig.json', 'utf8'));
        node_assert_1.default.strictEqual(ts.compilerOptions.outDir, './dist', 'outDir should be ./dist');
    });
    (0, node_test_1.it)('should have rootDir set to src in tsconfig', () => {
        const ts = JSON.parse(fs_1.default.readFileSync('tsconfig.json', 'utf8'));
        node_assert_1.default.strictEqual(ts.compilerOptions.rootDir, './src', 'rootDir should be ./src');
    });
    (0, node_test_1.it)('should have dist directory after build', () => {
        const distPath = path_1.default.join(process.cwd(), 'dist');
        node_assert_1.default.ok(fs_1.default.existsSync(distPath), 'dist directory should exist');
        node_assert_1.default.ok(fs_1.default.statSync(distPath).isDirectory(), 'dist should be a directory');
    });
    (0, node_test_1.it)('should have compiled index.js in dist', () => {
        const indexPath = path_1.default.join(process.cwd(), 'dist', 'index.js');
        node_assert_1.default.ok(fs_1.default.existsSync(indexPath), 'dist/index.js should exist');
    });
    (0, node_test_1.it)('should have compiled db.js in dist', () => {
        const dbPath = path_1.default.join(process.cwd(), 'dist', 'db.js');
        node_assert_1.default.ok(fs_1.default.existsSync(dbPath), 'dist/db.js should exist');
    });
    (0, node_test_1.it)('should have test script in package.json', () => {
        const pkg = JSON.parse(fs_1.default.readFileSync('package.json', 'utf8'));
        node_assert_1.default.ok(pkg.scripts.test, 'should have test script');
    });
});
//# sourceMappingURL=build.test.js.map