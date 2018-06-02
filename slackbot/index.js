const { WebClient } = require('@slack/client');
const dotenv = require('dotenv');
dotenv.config({
  silent: true,
});
const token = process.env.SLACK_OAUTH;
const web = new WebClient(token);
const conversationId = 'CAZ0GKV6K';

const postMessage = function(text) {
  web.chat
    .postMessage({ channel: conversationId, text })
    .then(res => console.log(('Message Sent: ', res.ts)))
    .catch(console.error);
};

module.exports.postMessage = postMessage;
