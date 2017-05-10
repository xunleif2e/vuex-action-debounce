module.exports = function vuexActionDebounce (timeout = 0) {
  return (store) => {
    const dispatchOrigin = store.dispatch

    store.dispatch = debouncedDispatch
    store._debouncedActions = {}

    /**
     * @method debouncedDispatch
     * @return {Promise}
     */
    function debouncedDispatch () {
      let args = Array.prototype.slice.call(arguments)
      let actionType = Array.prototype.shift.call(args)
      let argsKey = ''

      try {
        argsKey = JSON.stringify(args)
      } catch (e) {
        console.warn(e)
      }

      return promiseOne(
        () => dispatchOrigin.apply(store, arguments),
        `${actionType}_${argsKey}`,
        store._debouncedActions,
        timeout
      )
    }

    /**
     * 相同KEY的promise同一时间只执行一次
     *
     * @method promiseOne
     * @param {function} createPromiseFn
     * @param {string} key
     * @param {object} cacheObj - 缓存对象
     * @param {number} timeout - 缓存时间
     */
    function promiseOne (createPromiseFn, key, cacheObj, timeout) {
      // console.group(key)
      if (!cacheObj[key]) {
        // console.log('no cache')
        cacheObj[key] = createPromiseFn()
        // console.log('write cache')
        cacheObj[key]
          .then(null, () => {})
          .then(() => {
            setTimeout(() => {
              delete cacheObj[key]
            }, timeout)
          })
      }

      // console.log('read cache')
      // console.groupEnd(key)

      return cacheObj[key]
    }
  }
}
