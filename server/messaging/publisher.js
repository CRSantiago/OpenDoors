// messaging/publisher.js
import amqp from "amqplib"

async function publishMessage(data) {
  const conn = await amqp.connect("amqp://localhost")
  const channel = await conn.createChannel()
  const queue = "jobApplicationOperations"

  await channel.assertQueue(queue, { durable: true })
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
    persistent: true,
  })

  console.log(" [x] Sent '%s'", data)
  await channel.close()
  await conn.close()
}

export default publishMessage
