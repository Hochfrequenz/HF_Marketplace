---
name: code-review
description: Use when reviewing code changes, PRs, or completed features — structured review checklist for correctness, readability, performance, and security
---

# Code Review

A systematic approach to reviewing code changes.

## Review Process

1. **Understand context** — Read the PR description, linked issues, and design docs
2. **Read the diff** — Understand what changed and why
3. **Check correctness** — Does the code do what it claims?
4. **Check readability** — Can another developer understand it?
5. **Check performance** — Are there obvious bottlenecks?
6. **Check security** — Are there vulnerabilities (injection, XSS, auth bypass)?

## Checklist

- [ ] Changes match the stated intent
- [ ] No unrelated changes mixed in
- [ ] Error handling is appropriate
- [ ] Edge cases are covered
- [ ] Tests are meaningful (not just coverage padding)
- [ ] No hardcoded secrets or credentials
- [ ] Names are clear and accurate
- [ ] No unnecessary complexity

## Feedback Guidelines

- **Be specific.** Reference file:line, suggest alternatives.
- **Distinguish severity.** Critical (must fix) vs. Minor (nice to have).
- **Explain why.** Don't just say "change this" — explain the reasoning.
- **Acknowledge good work.** Note well-written code too.
