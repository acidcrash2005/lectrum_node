const { createSign } = require('crypto');
const { privateKey } = require('./keys');

const encrypt = data => {
    const sign = createSign('SHA256');
    const bufData = Buffer.from(JSON.stringify(data));

    sign.update(bufData);
    sign.end();

    return sign.sign(privateKey);
};

module.exports = { encrypt };
