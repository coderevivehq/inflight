---
title: Troubleshooting
description: Resolve common lifecycle problems in inflight integrations.
navOrder: 6
---

# Troubleshooting

## Callbacks remain pending

**Cause:** The underlying operation did not call its resolver, and the first `inflight` call did not set a timeout or retain the resolver for cancellation.

**Resolution:** Pass a finite `options.timeout`, or retain the resolver and call `resolve.cancel()` when the operation is abandoned.

## A caller receives `null`

**Cause:** Work for the same key is already pending. Returning `null` is the established signal that the caller joined existing work.

**Resolution:** Do not start duplicate work. The registered callback will run when the first caller invokes its resolver, times out, or cancels.

## Getting help

For ordinary bugs, open a [GitHub issue](https://github.com/coderevivehq/inflight/issues) with a minimal reproduction. Report security concerns privately through the repository's [Security](https://github.com/coderevivehq/inflight/security) page.
