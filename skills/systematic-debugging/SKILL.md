---
name: systematic-debugging
description: Use when encountering any bug, test failure, or unexpected behavior — guides through structured reproduction, hypothesis, and verification
---

# Systematic Debugging

A structured approach to debugging that prevents random code changes and ensures root cause analysis.

## Process

1. **Reproduce** — Create a minimal, reliable reproduction case
2. **Observe** — Collect error messages, stack traces, logs
3. **Hypothesize** — Form a specific, testable hypothesis about the cause
4. **Test** — Verify or disprove your hypothesis with a targeted experiment
5. **Fix** — Apply the minimal fix that addresses the root cause
6. **Verify** — Confirm the fix resolves the issue without side effects

## Rules

- **Never skip reproduction.** If you can't reproduce it, you can't verify the fix.
- **One hypothesis at a time.** Don't shotgun multiple changes hoping one works.
- **Minimal fixes only.** Don't refactor or clean up while debugging.
- **Document findings.** Note what you tried and what you learned.

## When to use

Use this skill whenever you encounter:
- Unexpected behavior or output
- Test failures
- Runtime errors or exceptions
- Performance regressions
