const { WebClient, RTMClient } = require('@slack/client');
const dotenv = require('dotenv');

dotenv.config({ silent: true });
const token = process.env.BOT_OAUTH;
const web = new WebClient(token);
const rtm = new RTMClient(token);

rtm.start();

const userList = {};
const channelList = {};

web.users // get list of users and format into object to reference userID to name
  .list()
  .then((res) => {
    res.members.map(item => (userList[item.id] = item.name));
    console.log(userList);
  });

web.channels // get list of channels and format into object to reference channelID to name
  .list()
  .then((res) => {
    console.log(res.channels[0].members); // get list of members of a channel
    res.channels.map(item => (channelList[item.id] = item.name)); // format channels to their names in object format for easy reference
    console.log(channelList);
  });

function postMessage(text, user = 'UAYRAJH8W', channel = 'CAZ0GKV6K') {
  web.chat.postMessage({ channel, text }).catch(console.error);
}

rtm.on('slack_event', (type, event) => {
  console.log(event);
  if (type === 'message') {
    if (event.text === 'hello') { rtm.sendMessage(`howdy, ${userList[event.user]}`, event.channel); }
  }
});

module.exports.postMessage = postMessage;
