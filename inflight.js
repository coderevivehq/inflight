var wrappy = require('wrappy')
var reqs = Object.create(null)
var once = require('once')

module.exports = wrappy(inflight)

function inflight (key, cb, options) {
  if (reqs[key]) {
    reqs[key].callbacks.push(cb)
    return null
  }

  var timeout = getTimeout(options)
  var request = reqs[key] = {
    callbacks: [cb],
    timer: null
  }
  var resolver = makeres(key, request)

  if (timeout !== null) {
    request.timer = setTimeout(function () {
      var error = new Error('In-flight request timed out after ' + timeout + 'ms')
      error.code = 'ETIMEDOUT'
      error.key = key
      error.timeout = timeout
      resolver(error)
    }, timeout)
  }

  resolver.cancel = function cancel (error) {
    if (resolver.called) return false

    if (error === undefined) {
      error = new Error('In-flight request was cancelled')
      error.code = 'ECANCELED'
      error.key = key
    }

    resolver(error)
    return true
  }

  return resolver
}

function getTimeout (options) {
  if (options == null || options.timeout === undefined) return null

  var timeout = options.timeout
  if (typeof timeout !== 'number' || !isFinite(timeout) || timeout < 0) {
    throw new TypeError('options.timeout must be a finite, non-negative number')
  }

  return timeout
}

function makeres (key, request) {
  return once(function RES () {
    if (request.timer !== null) {
      clearTimeout(request.timer)
      request.timer = null
    }

    var cbs = request.callbacks
    var len = cbs.length
    var args = slice(arguments)

    // Callbacks added during resolution are delivered on the next tick, which
    // preserves the established behavior while avoiding synchronous recursion.
    try {
      for (var i = 0; i < len; i++) {
        cbs[i].apply(null, args)
      }
    } finally {
      if (cbs.length > len) {
        cbs.splice(0, len)
        process.nextTick(function () {
          RES.apply(null, args)
        })
      } else {
        delete reqs[key]
      }
    }
  })
}

function slice (args) {
  var length = args.length
  var array = []

  for (var i = 0; i < length; i++) array[i] = args[i]
  return array
}
