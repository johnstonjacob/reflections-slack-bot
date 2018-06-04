const { WebClient, RTMClient } = require('@slack/client');
const dotenv = require('dotenv');

dotenv.config({ silent: true });
const token = process.env.BOT_OAUTH;
const web = new WebClient(token);
const rtm = new RTMClient(token);

rtm.start();

const userList = {};
const channelList = {};

// user = 'UAYRAJH8W'

function postMessage(text, channel = 'UAYRAJH8W') {
  web.chat.postMessage({ channel, text });
}

function getUsers() {
  return userList;
}

web.users // get list of users and format into object to reference userID to name
  .list()
  .then((res) => {
    res.members.map((item) => {
      userList[item.id] = item.name;
      return userList[item.id];
    });
  });

web.channels // get list of channels and format into object to reference channelID to name
  .list()
  .then((res) => {
    res.channels.map((item) => {
      channelList[item.id] = item.name;
      return channelList[item.id];
    });
    // format channels to their names in object format for easy reference
  });

rtm.on('slack_event', (type, event) => {
  if (type === 'message') {
    if (event.text === 'hello') {
      rtm.sendMessage(`howdy, ${userList[event.user]}`, event.channel);
    }
  }
});

module.exports.postMessage = postMessage;
module.exports.getUsers = getUsers;
