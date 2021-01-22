// @ts-check

const EventEmitter = require('events')
const EVENT = 'EVENT'
const _ = require('lodash')

const tmp = _.memoize(() => {
  return new EventEmitter()
})

const event = tmp()

function producer(data) {
  event.emit(EVENT, data)
}

function customer(cb) {
  event.on(EVENT, cb)
}

module.exports = {
  producer,
  customer,
}
