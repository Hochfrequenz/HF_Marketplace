---
name: test-driven-development
description: Use when implementing any feature or bugfix — enforces the Red-Green-Refactor cycle to write failing tests first, then minimal implementation
---

# Test-Driven Development

Enforce the Red-Green-Refactor cycle for every feature and bugfix.

## The Cycle

### 1. Red — Write a failing test
- Write a test that describes the expected behavior
- Run it — it MUST fail
- If it passes, the test is wrong or the feature already exists

### 2. Green — Write minimal code to pass
- Implement only enough code to make the test pass
- No extra features, no premature optimization
- Run the test — it MUST pass now

### 3. Refactor — Clean up while tests stay green
- Remove duplication
- Improve naming
- Simplify logic
- Run tests after every change — they must stay green

## Rules

- **Never write implementation before the test.**
- **Never skip the red step.** A test that never failed proves nothing.
- **Minimal implementation only.** YAGNI applies strictly.
- **Commit after each green.** Small, verified steps.
