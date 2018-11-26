const express = require('express');
const router = express.Router();
const send = require('../messenger-api-helpers/send');
const VERIFY_TOKEN = "myfirstchatbotapp";
const users = require('../model/users');
const partners_users = require('../model/partners_users');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const getPartnerPsid = async (sender_id) => {
    try {
        const partner = await partners_users.findOne({
            where: {
                user_id: sender_id
            }
        });
        return partner.partner_psid;
    } catch (e) {
        console.log(e.message);
    }


};

function deleteMatch(sender_id, sender_psid) {
    partners_users.destroy({
        where: {
            [Op.or]: [{user_id: sender_id}, {partner_psid: sender_psid}]
        }
    })
}


async function ppPartner(sender_id, sender_psid) {
    await deleteMatch(sender_id, sender_psid);
}

async function updateMatchedUsers(sender_psid, partner_psid, match) {
    users.update({
            matched: match
        }, {
            where: {
                [Op.or]: [{psid: sender_psid}, {psid: partner_psid}]
            }
        }
    )
};

const checkSenderId = async (sender_psid) => {
    try {
        let user = await users.findOne({
            where: {
                psid: sender_psid
            }
        });

        if (!user) {
            user = await users.create({
                psid: Number(sender_psid)
            });
            return user;
        }

        return user;

    } catch (e) {
        console.log(e.message);
    }

};

const matchUsers = async (sender_psid) => {
    const data = await users.findAll({
        where: {matched: 0}
    });
    let usersNotMatch = [];
    let sender = {};
    data.forEach(e => {
        if (e.dataValues.psid === sender_psid) {
            sender = e.dataValues;
            return
        }
        usersNotMatch.push(e.dataValues);
    });

    const sizeUser = usersNotMatch.length;
    const randUser = Math.floor((Math.random() * sizeUser) + 1);
    const partner = usersNotMatch[randUser - 1];
    try {
        await partners_users.create({
            user_id: sender.id,
            partner_psid: partner.psid
        });
        await partners_users.create({
            user_id: partner.id,
            partner_psid: sender.psid
        });
        await updateMatchedUsers(sender.psid, partner.psid, 1);
    } catch (e) {
        console.log(e.message);
    }


};

const checkPartner_psid = (partner_psid) => {
    if (!partner_psid) {
        return 0;
    } else return 1;
};

router.get('/', (req, res) => {

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});

router.post('/', (req, res) => {

    let body = req.body;

    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        body.entry.forEach(async (entry) => {

            // Gets the body of the webhook event
            let webhook_event = entry.messaging[0];
            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            if (webhook_event.postback) {
                await send.handlePostback(sender_psid, webhook_event.postback);
            }
            console.log('Sender PSID: ' + sender_psid);
            const user = await checkSenderId(sender_psid);
            if (user.matched === 1 && webhook_event.message) {
                let partner_psid = await getPartnerPsid(user.id);
                let checkPartner = checkPartner_psid(partner_psid);
                const message = webhook_event.message.text;

                if (checkPartner) {
                    if (message === "pp") {
                        await send.handleChatMessage(partner_psid, message);
                        await ppPartner(user.id, user.psid);
                        await updateMatchedUsers(sender_psid, partner_psid, 0);
                        await send.handlePPmessage(sender_psid, partner_psid);
                        await send.handleFindPartnerMessage(sender_psid, partner_psid);
                    } else {
                        await send.handleChatMessage(partner_psid, message);
                    }
                }

            } else if (user.matched === 0 &&webhook_event.message) {
                await matchUsers(sender_psid);
                const partner_psid = await getPartnerPsid(user.id);
                await send.handleFindSuccess(sender_psid, partner_psid);

            }
        });

        // Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED');

    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

});


module.exports = router;
