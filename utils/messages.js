const moment = require("moment");

function formatMessage(username,text,friend_id){
    return{
        username,
        text,
        friend_id,
        time:moment().format('h:mm a')
    }
}

module.exports = formatMessage;