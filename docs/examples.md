---
title: Examples
description: Use inflight cancellation and custom errors in callback integrations.
navOrder: 5
---

# Examples

## Cancel abandoned work

Keep the resolver returned to the first caller and cancel it if the underlying operation is abandoned.

```js
var inflight = require('@coderevivehq/inflight')

var resolve = inflight('account:42', function (error, account) {
  if (error) {
    console.error(error.code)
    return
  }
  console.log(account)
})

if (resolve) {
  var timer = setTimeout(function () {
    resolve(null, { id: 42 })
  }, 1000)

  setTimeout(function () {
    clearTimeout(timer)
    resolve.cancel()
  }, 10)
}
```

## Supply a domain-specific cancellation error

```js
var inflight = require('@coderevivehq/inflight')

var resolve = inflight('report:weekly', function (error) {
  console.error(error.code)
})

if (resolve) {
  var error = new Error('Weekly report generation was stopped')
  error.code = 'EREPORTSTOPPED'
  resolve.cancel(error)
}
```

The supplied error is forwarded as the first and only argument to every callback waiting for that key.
