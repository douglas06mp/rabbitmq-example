#!/usr/bin/env node

var amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', function (err0, connection) {
  if (err0) throw err0

  connection.createChannel(function (error1, channel) {
    if (error1) throw error1

    const queue = 'task'
    channel.assertQueue(queue, { durable: true })
    channel.prefetch(1)

    channel.consume(
      queue,
      function (msg) {
        const content = msg.content.toString()
        const seconds = content.length
        console.log('received %s', content)

        setTimeout(function () {
          console.log('processed %s after %s seconds', content, seconds)
          channel.ack(msg)
        }, seconds * 1000)
      },
      { noAck: false }
    )
  })
})
