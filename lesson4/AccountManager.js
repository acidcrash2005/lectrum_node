const { Writable } = require('stream');

class AccountManager extends Writable {
    constructor(options = {
        objectMode: true,
    }) {
        super(options);
    }


    _write(chunk, encoding, callback) {
        console.log(chunk.payload);
        callback();
    }
}


module.exports = { AccountManager };
