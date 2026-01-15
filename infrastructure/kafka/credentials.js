const { Kafka } = require('kafkajs')
 require('dotenv').config();


const kafka = new Kafka({
  clientId: 'user-service',
  brokers: [process.env.KAFKA_BROKER],
})
module.exports = {kafka};