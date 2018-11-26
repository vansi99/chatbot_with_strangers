const inboxToPartnerMessages = (text) => {
    return {
        "text": text
    };
};

const  wellcomeMessages = () => {
    return {
        "text": `Chào mừng bạn đến chat bot bấm phím bất kì để kết nói...`
    };
};



const ppMessage = () => {
    return {
        "text": `Đang Hủy đối tác hiện tại ...`
    };
};

const matchMessage = () => {
    return {
        "text": `Bấm phím bất kỳ để tìm đối tác mới nhanh hơn...`
    };
};

const matchSuccess = () => {
    return {
        "text": `Tìm đối tác thành công !!!`
    };
};

module.exports = {
    wellcomeMessages,
    inboxToPartnerMessages,
    ppMessage,
    matchMessage,
    matchSuccess
};