const Log = require("../../domain/entities/log")

const { kafka } = require("./credentials");

const consumer = kafka.consumer({ groupId: "log-group" });

exports.startConsumer = async()=>{
    await consumer.connect();
    await consumer.subscribe({topic:'user-activity',fromBeginning:true});

    await consumer.run({
        eachMessage: async ({ message }) => {
        const data = JSON.parse(message.value.toString());
        await Log.create(data);
        console.log("Saved log:", data);
        },
    })
}

