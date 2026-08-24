# Security Policy

We take the security of **FinMate AI** seriously.  
This document outlines how to report vulnerabilities and our commitment to keeping the project safe.

---

## 🔒 Supported Versions

We actively maintain and patch the following versions:

- `main` branch (latest release)
- Current stable release

Older versions may not receive security updates.

---

## 🛡 Reporting a Vulnerability

If you discover a security issue:

1. **Do not open a public issue.**
2. Email the maintainers directly at: `security@finmateai.org`
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

We will acknowledge receipt within **48 hours** and provide a timeline for resolution.

---

## ⚙️ Security Best Practices for Contributors

- Never commit secrets or `.env` files.
- Use environment variables for API keys and tokens.
- Run `npm audit` before submitting a PR.
- Keep dependencies updated (`npm outdated`).
- Follow secure coding practices (validate inputs, sanitize outputs).
- Test for accessibility and performance with Lighthouse.

---

## 🚨 Responsible Disclosure

We ask that vulnerabilities be reported responsibly:

- Allow maintainers time to patch before public disclosure.
- Do not exploit vulnerabilities for personal gain.
- Collaborate with us to ensure a safe fix.

---

## 📜 Commitment

We are committed to:

- Promptly addressing security issues
- Communicating transparently with contributors
- Maintaining a safe environment for all users
