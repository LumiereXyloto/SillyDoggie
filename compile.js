function nodeToFragment(el) {
  var fragment = document.createDocumentFragment()
  var child = el.firstChild
  while (child) {
    fragment.appendChild(child)
    child = el.firstChild
  }
  return fragment
}

function compileText(node, exp) {
  var _this = this
  var initText = this.vm[exp]
  updateText(node, initText)
  new Watcher(this.vm, exp, function(value) {
    _this.updateText(node, value)
  })
}

function updateText(node, value) {
  node.textContent = typeof value == 'undefined' ? '' : value
}