const { Writable } = require('stream');
const { createVerify } = require('crypto');
const { failedKey, publicKey } = require('./keys');

class AccountManager extends Writable {
    #db;

    constructor(
        options = {
            objectMode: true,
        }
    ) {
        super(options);

        this.#db = [];
    }

    _write(chunk, encoding, done) {
        const {
            mata: { signature },
            payload,
        } = chunk;

        const verify = createVerify('SHA256');
        const bufData = Buffer.from(JSON.stringify(payload));

        verify.update(bufData);
        verify.end();

        const isVerify = verify.verify(publicKey, signature);

        if (isVerify) {
            this.#db.push(chunk);
            console.log(chunk);
        } else {
            console.error('Verify is failed!');
        }

        done();
    }
}

module.exports = AccountManager;
