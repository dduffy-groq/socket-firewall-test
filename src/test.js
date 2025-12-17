/**
 * Simple test runner
 */

const assert = require('assert');

console.log('Running tests...\n');

// Test 1: Package.json exists
try {
  const pkg = require('../package.json');
  assert(pkg.name === 'socket-firewall-test');
  console.log('✓ Package.json is valid');
} catch (e) {
  console.log('✗ Package.json test failed:', e.message);
  process.exit(1);
}

// Test 2: Main module loads
try {
  const app = require('./index.js');
  assert(typeof app === 'function');
  console.log('✓ Main module loads correctly');
} catch (e) {
  console.log('✗ Main module test failed:', e.message);
  process.exit(1);
}

// Test 3: Build script runs
try {
  require('./build.js');
  const fs = require('fs');
  const path = require('path');
  assert(fs.existsSync(path.join(__dirname, '..', 'dist', 'build-artifact.json')));
  console.log('✓ Build script generates artifact');
} catch (e) {
  console.log('✗ Build script test failed:', e.message);
  process.exit(1);
}

console.log('\nAll tests passed!');

