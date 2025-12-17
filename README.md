# Socket Firewall Test Repository

⚠️ **WARNING: This repository intentionally contains protestware for testing purposes.**

This is a test repository for [Socket Firewall Configurator](https://github.com/dduffy-groq/socket-firewall-configurator). It demonstrates how Socket security policies can detect and block malicious packages.

## Purpose

This repo tests that Socket correctly:
1. Detects known protestware packages
2. Applies blocking rules from `socket.yml`
3. Reports security issues in CI/CD

## Intentionally Included Protestware

| Package | Version | Status | Issue |
|---------|---------|--------|-------|
| `faker` | 6.6.6 | ⚠️ **STILL ON NPM** | Protestware - prints "LIBERTY" infinitely |

### Removed From NPM (for reference)

These packages were protestware but have been removed from npm:

| Package | Version | Status |
|---------|---------|--------|
| `colors` | >=1.4.1 | ❌ Removed from npm |
| `node-ipc` | 10.1.1-10.1.2 | ❌ Removed from npm |

## Socket Configuration

The `socket.yml` is configured to:
- **ERROR (block)**: knownMalware, protestware, criticalCVE, highCVE
- **WARN**: mediumCVE, deprecated, unmaintained
- **IGNORE**: trivialPackage, floatingDependency

Specific package rules block the protestware:
```yaml
deferredPackageRules:
  - name: "faker"
    version: ">=6.6.6"
    action: error
    reason: "Protestware - intentionally corrupted"
```

## Expected CI Behavior

When GitHub Actions run:
1. ❌ **Socket Security** - Fails (detects faker@6.6.6 as protestware)
2. ❌ **CI** - Fails (security check blocks build)
3. ❌ **Dependency Install Test** - Fails (policy enforcement)
4. ✅ **Socket Firewall Configurator** - Passes (socket.yml is valid)

## Related

- [Socket Firewall Configurator](https://github.com/dduffy-groq/socket-firewall-configurator)
- [Socket.dev](https://socket.dev)
- [faker protestware incident](https://www.bleepingcomputer.com/news/security/dev-corrupts-npm-libs-colors-and-faker-breaking-thousands-of-apps/)
