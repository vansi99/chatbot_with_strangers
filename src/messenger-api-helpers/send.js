const api = require('./api');
const messages = require('./messages');
const users = require('../model/users');

async function handleChatMessage(recipient_psid, message){
    await api.callMessageAPI(recipient_psid, messages.inboxToPartnerMessages(message));
}

async function handlePPmessage(sender_psid, recipient_psid){
    await api.callMessageAPI(recipient_psid, messages.ppMessage());
    await api.callMessageAPI(sender_psid,messages.ppMessage());

}

async function handleFindPartnerMessage(sender_psid, recipient_psid){
    await api.callMessageAPI(sender_psid,messages.matchMessage());
    await api.callMessageAPI(recipient_psid, messages.matchMessage())
}

async function handleFindSuccess(sender_psid, recipient_psid) {
    await api.callMessageAPI(sender_psid, messages.matchSuccess());
    await api.callMessageAPI(recipient_psid, messages.matchSuccess());
}

async function handlePostback(sender_psid, received_postback){
    let payload = received_postback.payload;
    payload = JSON.parse(payload);
    console.log(payload);
    if(payload.type === 'GET_STARTED'){
        console.log('ok');
        await users.create({
            psid: Number(sender_psid),
        });
        api.callMessageAPI(sender_psid, messages.welcomeMessages());
    } else {
        console.log("fail");
    }
}


module.exports = {
    handlePostback,
    handleChatMessage,
    handlePPmessage,
    handleFindPartnerMessage,
    handleFindSuccess
};