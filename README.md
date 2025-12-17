# Socket Firewall Test Repository

⚠️ **This repository intentionally contains problematic packages for testing purposes.**

## Test Results

### Socket Firewall (sfw) Free Tier

| Package | sfw Blocks? | npm audit Detects? | Notes |
|---------|-------------|-------------------|-------|
| `faker@6.6.6` | ❌ No | ✅ Yes (high severity) | Protestware - not in sfw block list |

**Key Finding**: The `sfw` free tier blocks truly malicious packages (malware, cryptominers, etc.) but may not block "protestware" like faker that only sabotages output rather than stealing data.

### Detection Methods Comparison

| Method | What it does | faker@6.6.6 |
|--------|--------------|-------------|
| `sfw npm install` | Blocks malware at install time | ❌ Allows |
| `npm audit` | Detects known vulnerabilities | ✅ Detects (GHSA-5w9c-rv96-fr7g) |
| Socket GitHub App | Full Socket integration | ✅ Would detect/block |

## Recommendations

1. **Use `sfw` for malware protection** - Blocks truly dangerous packages
2. **Use `npm audit` for CVE detection** - Catches more issues including protestware
3. **Install Socket GitHub App** for full protection with `socket.yml` policy enforcement

## Commands Used

```bash
# Install sfw globally
npm install -g sfw

# Clear cache (required for sfw interception)
npm cache clean --force

# Install with Socket Firewall protection
sfw npm install

# Check for known vulnerabilities
npm audit
```

## Intentional Bad Package

- **faker@6.6.6** - Protestware that prints "LIBERTY" infinitely
  - npm advisory: GHSA-5w9c-rv96-fr7g
  - Severity: High
  - Status: Still on npm (not removed)

## Related

- [Socket Firewall Free Docs](https://docs.socket.dev/docs/socket-firewall-free)
- [Socket Firewall Configurator](https://github.com/dduffy-groq/socket-firewall-configurator)
- [faker protestware incident](https://www.bleepingcomputer.com/news/security/dev-corrupts-npm-libs-colors-and-faker-breaking-thousands-of-apps/)
