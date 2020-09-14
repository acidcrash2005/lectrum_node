const { Transform } = require('stream');
const { DB } = require('./DB');

const db = new DB();

class Logger extends Transform {
    constructor(options = {
        readableObjectMode: true,
        writableObjectMode: true
    }) {
        super(options);
    }

    _transform(chunk, encoding, callback) {

        this.push(chunk);
        db.emit('data', chunk);
        callback();
    }
}




module.exports = { Logger };
