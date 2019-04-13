function defineReactive(data, key, val) {
  observe(val) // 递归遍历所有的子属性
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      return val
    },
    set: function(newVal) {
      val = newVal
      console.log(`属性${key}已经被监听了，现在它的值为：${newVal.toString()}`)
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

//试一试效果
var Person = {
  lbw: {
    height: 180,
    hobby: 'study'
  },
  ljq: ''
}

observe(Person)
Person.lbw.height = 179
Person.ljq = '垃圾'

