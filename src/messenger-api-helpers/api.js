const request = require('request');
const PAGE_ACCESS_TOKEN = "EAAEIF6fxc3YBAC7l2ZAwrRvj2LquPxfONdEIZCGxnZAJi66bBuBUeU0pGp7DhBgl4X4Ei4GfQu38VNVjY08uXgLZCdZCoEWxFQ3IvW9rtrs8hdWL6Qp4E5A2Ni4BEs5I1h3kUesR1bDMgmxgz6BEJ6XHUiZChdzPv8KV7LQ8xeTC0VASxvO0FP";

const callMessageAPI = (sender_psid, response) => {
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": {"access_token": PAGE_ACCESS_TOKEN},
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
};

const callThreadAPI = (message) => {
    request({
        "uri": "https://graph.facebook.com/v2.6/me/thread_settings",
        "qs": {"access_token": PAGE_ACCESS_TOKEN},
        "method": "POST",
        "json": message
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
};

module.exports = {
    callMessageAPI
};