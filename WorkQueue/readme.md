# [Work Queues](https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html)

## Message durability

當 RabbitMQ 服務中斷時，queue 與 meesage 不會遺失，服務重啟時會繼續執行

```javascript
// task.js
channel.assertQueue('some_queue', { durable: true })
channel.sendToQueue('some_queue', Buffer.from(msg), { persistent: true })

// worker.js
channel.assertQueue('some_queue', { durable: true })
```

## Message acknowledgment

透過 Message acknowledgment 的機制，讓 consumer 告訴 RabbitMQ 某個 mesage 已被接收且處理完成

```javascript
// worker.js
channel.consume(
  'some_queue',
  function (msg) {
    channel.ack(msg)
  },
  { noAck: false }
)
```

## Fair dispatch

Round-Robin 是 RabbitMQ 預設的分派方式，可能會出現特定 worker 都處理到耗時較長的任務的情形發生。為防止這種情況發生，可以設定 prefetch，當 worker 裡還有 n 個未處理完成的任務，RabbitMQ 就不會繼續分派

```javascript
// worker.js
channel.prefetch(1)
```

## Usage

### new task

```
./src/task.js example message
```

### handle task

```
./src/worker.js
```
