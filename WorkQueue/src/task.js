#!/usr/bin/env node

const amqp = require('amqplib/callback_api')

amqp.connect(function (err0, connection) {
  if (err0) throw err0

  connection.createChannel(function (err1, channel) {
    if (err1) throw err1

    const queue = 'task'
    const msg = process.argv.slice(2).join('') || 'new task'

    channel.assertQueue(queue, { durable: true })
    channel.sendToQueue(queue, Buffer.from(msg), { persistent: true })

    console.log('sent %s', msg)
  })

  setTimeout(() => {
    connection.close()
    process.exit(0)
  }, 500)
})
