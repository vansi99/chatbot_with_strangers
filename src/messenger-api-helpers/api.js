const request = require('request');
const PAGE_ACCESS_TOKEN = "EAAEIF6fxc3YBACn9PLCclx1MLMwNaNdjSzsZA2N7LfDLIyOoZBHZB8ZBchlFJG5tzZB8kxyvylgcrNEvvMRLHOb88xeHXJbbyOZCINPpeIZBASKXLZCW6h5ldSvILdtZBZAMFoVRKZAHtWGazMBBiZB0q9ZBT373l4Vvm4RqTZBrwAPdL6JDVRdptK0ECZB";

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