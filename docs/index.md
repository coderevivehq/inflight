---
title: Documentation overview
description: Coalesce callback-style asynchronous work safely with inflight.
navOrder: 1
---

# inflight documentation

`@coderevivehq/inflight` coordinates callback-style asynchronous operations by key. It is intended for existing Node.js integrations that need to prevent duplicate work while an operation is pending and need an explicit way to release pending callbacks if that work stalls.

New promise-based code should generally prefer native promise coordination or a maintained cache with asynchronous fetching.

## Start here

1. [Install the package](installation.md).
2. Follow the [Usage guide](usage.md) for a complete example with a timeout.
3. Consult the [API reference](api.md) for resolver, cancellation, and timeout behavior.

## Guides

- [Installation](installation.md)
- [Usage](usage.md)
- [API reference](api.md)
- [Examples](examples.md)
- [Troubleshooting](troubleshooting.md)
