---
title: Usage
description: Coalesce callback-style operations and release stalled work.
navOrder: 3
---

# Usage

## Basic example

```js
var fs = require('fs')
var inflight = require('@coderevivehq/inflight')

function readOnce (filename, callback) {
  var resolve = inflight(filename, callback, { timeout: 30000 })
  if (!resolve) return

  fs.readFile(filename, resolve)
}

readOnce('settings.json', function (error, contents) {
  if (error) throw error
  console.log(contents.toString())
})

readOnce('settings.json', function (error, contents) {
  if (error) throw error
  console.log(contents.length)
})
```

## What the example does

The first call for `settings.json` receives a resolver and starts `fs.readFile`. The second call joins the pending entry and receives `null`, so it does not start another read. When the resolver runs, both callbacks receive the same arguments.

The timeout settles both callbacks with an `ETIMEDOUT` error if the underlying operation does not call the resolver within 30 seconds. The key is then released for later work.

If the underlying operation is explicitly abandoned, call `resolve.cancel()` to settle queued callbacks with an `ECANCELED` error and release the key.

## Next steps

- See the [API reference](api.md) for exact behavior.
- See [Examples](examples.md) for explicit cancellation.
