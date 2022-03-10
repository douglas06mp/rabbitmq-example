# [Routing](https://www.rabbitmq.com/tutorials/tutorial-four-javascript.html)

## Exchange(direct)

direct 模式會將接收到的訊息傳給特定的 queue 中

```javascript
// emit.js
channel.assertExchange('exchange_name', 'direct', { durable: false })
channel.publish('exchange_name', 'some_routing_key', Buffer.from('some_msg'))

// receive.js
channel.assertExchange('exchange_name', 'direct', { durable: false })
channel.assertQueue('', { exclusive: true }, function (err, q) {
  channel.bindQueue(q.queue, 'exchange_name', 'some_routing_key')
})
```

## Usage

### sending message

```
./src/emit.js example message -k error
```

### receiving message

```
./src/receive.js info warn error
./src/receive.js error
```
