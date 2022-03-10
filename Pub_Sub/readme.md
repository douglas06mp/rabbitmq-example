# [Publish/Subscribe](https://www.rabbitmq.com/tutorials/tutorial-three-javascript.html)

## Exchange(fanout)

fanout 模式會將接收到的訊息傳給所有 subscribe 的 queue

```javascript
// emit.js
channel.assertExchange('exchange_name', 'fanout', { durable: false })
channel.publish('exchange_name', '', Buffer.from('some_msg'))

// receive.js
channel.assertExchange('exchange_name', 'fanout', { durable: false })
channel.assertQueue('', { exclusive: true }, function (err, q) {
  channel.bindQueue(q.queue, 'exchange_name', '')
})
```

## Usage

### emit

```
./src/emit.js example message
```

### receive

```
./src/receive.js
```
