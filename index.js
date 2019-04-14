function Lumi(data, el, exp) {
  var _this = this
  this.data = data

  Object.keys(data).forEach(function(key) {
    _this.proxyKeys(key) // 绑定代理属性
  })

  observe(data)
  el.innerHTML = this.data[exp] // 初始化模板数据的值
  new Watcher(this, exp, function(value) {
    el.innerHTML = value
  })
  return this
}

Lumi.prototype = {
  proxyKeys: function(key) {
    var _this = this
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get: function proxyGetter() {
        return _this.data[key]
      },
      set: function proxySetter(newVal) {
        _this.data[key] = newVal
      }
    })
  }
}