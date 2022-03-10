#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2))
if (!argv._.filter((severity) => ['error', 'warn', 'info'].includes(severity)).length) {
  console.log('no valid severity provided')
  process.exit(0)
}
const severitys = argv._
console.log(severitys)

const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', function (err0, connection) {
  if (err0) throw err0

  connection.createChannel(function (err1, channel) {
    if (err1) throw err1

    const exchange = 'direct'
    channel.assertExchange(exchange, 'direct', { durable: false })

    channel.assertQueue('', { exclusive: true }, function (err2, q) {
      if (err2) throw err2

      console.log('waiting for logs')

      severitys.forEach(function (severity) {
        channel.bindQueue(q.queue, exchange, severity)
      })

      channel.consume(
        q.queue,
        function (msg) {
          console.log("%s: '%s'", msg.fields.routingKey, msg.content.toString())
        },
        { noAck: true }
      )
    })
  })
})
