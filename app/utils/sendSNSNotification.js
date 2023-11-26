const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

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
      console.log("SNS message published successfully:", data.MessageId);
    })
    .catch((err) => {
      console.error("Error publishing SNS message:", err);
    });
}

module.exports = {
    sendNotification: sendNotification
}
