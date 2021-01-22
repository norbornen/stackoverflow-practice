// @ts-check
const { customer } = require('./event')

customer((data) => {
  console.log('CUSTOMER DATA:', data)
})

new Promise((resolve) => setTimeout(resolve, 5000)).then(() => console.log('end')).catch((e) => console.log(e))
