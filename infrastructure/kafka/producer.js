const { kafka } = require("./credentials");

const producer= kafka.producer();

const connectProducer = async()=>{
    await producer.connect();
};

const sendUserActivity = async (activity)=>{
    await producer.send({
        topic:'user-activity',
        messages: [
           { value:JSON.stringify(activity)}
        ],
    });
};

module.exports={
    connectProducer,
    sendUserActivity
}
