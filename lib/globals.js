Object.defineProperty(String.prototype, 'upperFirst', {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
  },
  enumerable: false,
})
