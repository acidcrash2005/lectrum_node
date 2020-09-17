const { Writable } = require('stream');

class AccountManager extends Writable {
    #db;

    constructor(options = {
        objectMode: true,
    }) {
        super(options);

        this.#db = [];
    }


    _write(chunk, encoding, done) {
        console.log(chunk.payload);

        this.#db.push(chunk.payload);
        done();
    }
}


module.exports = { AccountManager };
