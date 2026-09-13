---
title: Installation
description: Install inflight in a callback-based Node.js project.
navOrder: 2
---

# Installation

## Requirements

- Node.js 14.16 or later.
- A callback-based operation that has a stable key for equivalent pending work.

## Install

```sh
npm install @coderevivehq/inflight
```

## Verify the installation

```sh
node -e "console.log(typeof require('@coderevivehq/inflight'))"
```

The command prints `function`.

## Next steps

Continue to the [Usage guide](usage.md).
