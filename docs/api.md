---
title: API reference
description: Reference for inflight coordination, cancellation, and timeouts.
navOrder: 4
---

# API reference

## `inflight(key, callback[, options])`

```js
var resolve = inflight(key, callback, options)
```

Registers a callback for pending work identified by `key`.

### Parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `key` | value usable as an object property | Yes | Identifies equivalent pending work. String keys are recommended. |
| `callback` | function | Yes | Receives every argument passed to the resolver. |
| `options.timeout` | non-negative finite number | No | On the first call for a key, settles the entry with an `ETIMEDOUT` error after this many milliseconds. |

### Returns

The first call for a key returns a once-only resolver function. A call made while that key is pending appends its callback and returns `null`.

Call the resolver with the result arguments from the underlying operation. All callbacks registered for the key receive those arguments, and the key is released. Calling the resolver more than once has no effect.

The resolver has a `cancel(error)` method. It settles the callbacks with the supplied error and releases the key. When no error is supplied, it creates an error whose `code` is `ECANCELED` and whose `key` is the request key. The method returns `true` when it cancels pending work and `false` after the resolver has already settled.

### Errors and edge cases

An invalid `options.timeout` on the first call throws `TypeError`. A timeout error has `code` set to `ETIMEDOUT`, plus `key` and `timeout` properties.

Options on callbacks that join an already pending key do not replace the timeout selected by the first caller.

Callbacks registered synchronously while a resolver is delivering a result are called with that same result on the next tick.

Without a timeout or an explicit resolver/cancellation call, callbacks remain pending. Use one of those cleanup paths whenever the underlying work may never settle.
