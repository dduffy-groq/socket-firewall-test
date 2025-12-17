/**
 * Build script - generates a random artifact for testing
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BUILD_DIR = path.join(__dirname, '..', 'dist');
const ARTIFACT_NAME = 'build-artifact.json';

// Create dist directory
if (!fs.existsSync(BUILD_DIR)) {
  fs.mkdirSync(BUILD_DIR, { recursive: true });
}

// Generate random build artifact
const artifact = {
  name: 'socket-firewall-test',
  version: require('../package.json').version,
  buildId: crypto.randomBytes(8).toString('hex'),
  timestamp: new Date().toISOString(),
  environment: process.env.NODE_ENV || 'development',
  checksums: {
    sha256: crypto.randomBytes(32).toString('hex'),
    md5: crypto.randomBytes(16).toString('hex')
  },
  metadata: {
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch
  }
};

// Write artifact
const artifactPath = path.join(BUILD_DIR, ARTIFACT_NAME);
fs.writeFileSync(artifactPath, JSON.stringify(artifact, null, 2));

console.log('Build completed successfully!');
console.log(`Artifact: ${artifactPath}`);
console.log(`Build ID: ${artifact.buildId}`);

