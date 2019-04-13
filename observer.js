function Dep() {
  this.subs = [] // 订阅器的容器是一个数组
}
Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub)
  },
  // 通知函数
  notify: function() {
    this.subs.forEach(function(sub) {
      sub.updata()
    })
  }
}

function defineReactive(data, key, val) {
  observe(val) // 递归遍历所有的子属性
  var dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      // 判断是否需要添加订阅者
      if (Dep.target) {
        // 添加订阅者，让watcher可以在初始化时进行触发
        dep.addSub(Dep.target)
      }
      return val
    },
    set: function(newVal) {
      if (val === newVal) {
        return
      }
      val = newVal
      console.log(`属性${key}已经被监听了，现在它的值为：${newVal.toString()}`)
      dep.notify() // 如果数据变化，通知所有订阅者
    }
  })
}

function observe(data) {
  if (!data || typeof data !== 'object') {
    return
  }
  Object.keys(data).forEach(function(key) {
    defineReactive(data, key, data[key])
  })
}
