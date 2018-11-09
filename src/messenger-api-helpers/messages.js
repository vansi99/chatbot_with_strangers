const inboxToPartnerMessages = (text) => {
    return {
        "text": text
    };
};


const ppMessage = () => {
    return {
        "text": `Đang Hủy đối tác hiện tại ...`
    };
};

const matchMessage = () => {
    return {
        "text": `Bấm phím bất kỳ để tìm đối tác mới ...`
    };
};

const matchSuccess = () => {
    return {
        "text": `Tìm đối tác thành công !!!`
    };
};

module.exports = {
    inboxToPartnerMessages,
    ppMessage,
    matchMessage,
    matchSuccess
};