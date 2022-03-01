#!/usr/bin/env node

const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', function (err0, connection) {
  if (err0) throw err0

  connection.createChannel(function (err1, channel) {
    if (err1) throw err1

    const queue = 'hello'
    const msg = 'hello world'

    channel.assertQueue(queue, {
      durable: false,
    })

    channel.sendToQueue(queue, Buffer.from(msg))
    console.log('sent %s', msg)
  })

  setTimeout(() => {
    connection.close()
    process.exit(0)
  }, 500)
})
