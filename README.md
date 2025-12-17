# Socket Firewall Test Repository

⚠️ **WARNING: This repository intentionally contains protestware dependencies for testing purposes.**

This is a test repository for [Socket Firewall Configurator](https://github.com/dduffy-groq/socket-firewall-configurator). It demonstrates how Socket security policies can detect and block malicious or protestware packages.

## Purpose

This repo tests that Socket correctly:
1. Detects known protestware packages
2. Applies blocking rules from `socket.yml`
3. Reports security issues in CI/CD

## Intentionally Included Protestware

| Package | Version | Issue |
|---------|---------|-------|
| `colors` | 1.4.1 | Protestware - infinite loop added by author |
| `faker` | 6.6.6 | Protestware - corrupted and unpublished by author |

**DO NOT** actually install these packages. They are listed in `package.json` only to test Socket detection.

## Socket Configuration

The `socket.yml` is configured to:
- **ERROR (block)**: knownMalware, protestware, criticalCVE, highCVE
- **WARN**: mediumCVE, deprecated, unmaintained
- **IGNORE**: trivialPackage, floatingDependency

Specific package rules block the protestware:
```yaml
deferredPackageRules:
  - name: "colors"
    version: ">=1.4.1"
    action: error
    reason: "Protestware - intentionally corrupted"
```

## Expected CI Behavior

When GitHub Actions run:
1. ✅ Socket Security job should detect the protestware
2. ⚠️ Build job may fail or warn about blocked packages
3. 📊 Security report artifact should list the issues

## Related

- [Socket Firewall Configurator](https://github.com/dduffy-groq/socket-firewall-configurator)
- [Socket.dev](https://socket.dev)

