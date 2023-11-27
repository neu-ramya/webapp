const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const { logger } = require("../../config/logger");

async function sendNotification(message) {
  const snsClient = new SNSClient({ region: process.env.AWS_REGION });

  const params = {
    Message: JSON.stringify(message),
    TopicArn: process.env.SNS_TOPIC_ARN,
  };

  const publishCommand = new PublishCommand(params);

  snsClient
    .send(publishCommand)
    .then((data) => {
      logger.info("SNS message published successfully:", data.MessageId);
    })
    .catch((err) => {
      logger.error("Error publishing SNS message:", err);
    });
}

module.exports = {
    sendNotification: sendNotification
}
