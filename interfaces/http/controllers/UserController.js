const {sendUserActivity}= require('../../../infrastructure/kafka/producer')
const Log = require("../../../domain/entities/log.js")

exports.postUserActivity = async (req, res,next ) => {
    const activity = {
        userId: req.body.userId,
        action: req.body.action,
        timestamp: new Date(),
    };
    console.log("Sending activity to kafka:", activity);

    await sendUserActivity(activity);

    res.status(202).json({ message: "Activity sent to Kafka" });
}

exports.getUserActivity = async (req, res,next ) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const filter = {};

  if (req.query.action) filter.action = req.query.action;
  if (req.query.userId) filter.userId = req.query.userId;

  const logs = await Log.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ timestamp: -1 });

  res.json(logs);
}