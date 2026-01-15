const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka1:9092', 'kafka2:9092'],
})

const routes = require("./interfaces/http/routes/routes");

const { connectProducer } = require("./infrastructure/kafka/producer");
const { startConsumer } = require("./infrastructure/kafka/consumer");


const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

// health check
app.get("/", (req, res) => {
  res.send("User Activity Service Running");
});

app.use(routes);
mongoose.connect(process.env.MONGO_URI)
  .then(() =>{
    (async () => {
        await connectProducer();
        await startConsumer();
    })();
    console.log("MongoDB connected")
    app.listen(process.env.PORT,()=>{
        console.log("application run successfully")
    })
  })
  .catch(console.error);
