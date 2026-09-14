<p align="center">
  <img src="https://raw.githubusercontent.com/coderevivehq/inflight/main/.github/assets/coderevive-hero.png" alt="inflight revived and maintained by CodeRevive" width="460">
</p>

<h1 align="center">inflight</h1>

<p align="center">
  A maintained continuation of <a href="https://github.com/npm/inflight">inflight</a> by <a href="https://github.com/coderevivehq">CodeRevive</a>.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@coderevivehq/inflight"><img alt="npm version" src="https://img.shields.io/npm/v/%40coderevivehq%2Finflight?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/@coderevivehq/inflight"><img alt="npm downloads" src="https://img.shields.io/npm/dm/%40coderevivehq%2Finflight?style=flat-square"></a>
  <a href="https://github.com/coderevivehq/inflight/actions/workflows/ci.yml"><img alt="build status" src="https://github.com/coderevivehq/inflight/actions/workflows/ci.yml/badge.svg"></a>
  <a href="LICENSE"><img alt="ISC license" src="https://img.shields.io/github/license/coderevivehq/inflight?style=flat-square"></a>
</p>

## Overview

`inflight` coalesces callback-style asynchronous work by key. The first caller receives a resolver function; later callers for the same key join the pending operation and receive the same result when that resolver runs. This continuation adds explicit cancellation and opt-in timeouts so callers can release retained callbacks when work does not settle.

New promise-based code should generally use native promise coordination or a maintained cache with asynchronous fetching. This package exists for callback-based integrations that need the established `inflight(key, callback)` contract while they migrate.

## Maintained by CodeRevive

This maintained continuation is published by [CodeRevive](https://github.com/coderevivehq). Security patches are our highest priority. We also review bug reports, feature requests, and suggestions from the community.

The project is based on the original [inflight](https://github.com/npm/inflight) repository by Isaac Z. Schlueter and its contributors.

## Quick links

- [Overview](#overview)
- [Maintained by CodeRevive](#maintained-by-coderevive)
- [Installation & setup](#installation--setup)
- [Documentation](#documentation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Security & support](#security--support)
- [Credits & license](#credits--license)

## Installation & setup

```sh
npm install @coderevivehq/inflight
```

The package uses CommonJS and supports Node.js 14.16 or later.

## Documentation

Detailed documentation is maintained with the source code in the [`docs/`](docs/) directory. Start with the [documentation overview](docs/index.md), then read the [Usage guide](docs/usage.md) and [API reference](docs/api.md).

## Usage

```js
var fs = require('fs')
var inflight = require('@coderevivehq/inflight')

function load (key, callback) {
  var resolve = inflight(key, callback, { timeout: 30000 })
  if (!resolve) return

  fs.readFile(key, resolve)
}
```

Only the first call for a key starts the underlying operation. Set a timeout or call `resolve.cancel()` when the operation cannot complete so queued callbacks are not retained indefinitely. See the [Usage guide](docs/usage.md) for complete examples.

## Contributing

Bug reports, focused improvements, and documentation updates are welcome through [GitHub issues](https://github.com/coderevivehq/inflight/issues) and [pull requests](https://github.com/coderevivehq/inflight/pulls). Please run `npm test` before submitting a change.

## Security & support

Report security concerns privately through the repository's [Security](https://github.com/coderevivehq/inflight/security) page. For usage questions and ordinary bugs, open a [GitHub issue](https://github.com/coderevivehq/inflight/issues) with a minimal reproduction when possible.

## Credits & license

This project is a maintained continuation of [the original inflight repository](https://github.com/npm/inflight). Original code and inherited files remain licensed under the upstream [ISC License](LICENSE). CodeRevive-authored changes are licensed under the MIT License in [LICENSE-CODEREVIVE](LICENSE-CODEREVIVE), unless a file states otherwise. Using the combined repository remains subject to all applicable license terms.

The original copyright notice for Isaac Z. Schlueter is retained in [LICENSE](LICENSE).
