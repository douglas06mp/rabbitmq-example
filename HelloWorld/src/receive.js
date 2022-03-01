#!/usr/bin/env node

const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', function (err0, connection) {
  if (err0) throw err0

  connection.createChannel(function (err1, channel) {
    if (err1) throw err1

    const queue = 'hello'

    channel.assertQueue(queue, { durable: false })

    channel.consume(
      queue,
      function (msg) {
        console.log('received %s', msg.content.toString())
      },
      { noAck: true }
    )
  })
})
