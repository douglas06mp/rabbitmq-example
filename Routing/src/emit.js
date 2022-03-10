#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2))
const msg = argv._.join(' ') || 'Hello World!'
const severity =
  typeof argv.k === 'string' && ['error', 'warn', 'info'].includes(argv.k)
    ? argv.k
    : 'info'

const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', function (err0, connection) {
  if (err0) throw err0

  connection.createChannel(function (err1, channel) {
    if (err1) throw err1

    const exchange = 'direct'

    channel.assertExchange(exchange, 'direct', { durable: false })
    channel.publish(exchange, severity, Buffer.from(msg))
    console.log("emit %s: '%s'", severity, msg)
  })

  setTimeout(function () {
    connection.close()
    process.exit(0)
  }, 500)
})
