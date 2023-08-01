const mongoose = require('mongoose');

let chatSchema = new mongoose.Schema({
    sender: {
        type: String,
        required:true
    },
    reciver: {
        type: String,
        required:true
    },
    content: {
        type:Object,
        Time: String,
        chat: String
    }
})

const Chat = mongoose.model('userChat', chatSchema);
module.exports = Chat;