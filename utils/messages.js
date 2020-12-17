const moment = require("moment");

function formatMessage(user_id,text,friend_id){
    return{
        user_id,
        text,
        friend_id,
        time:moment().format('h:mm a')
    }
}

module.exports = formatMessage;