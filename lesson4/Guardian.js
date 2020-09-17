const { Transform } = require('stream');

class Guardian extends Transform {
    constructor(options = {
        readableObjectMode: true,
        writableObjectMode: true
    }) {
        super(options);
    }

    #hexEncode = (data) => Buffer.from(data, 'utf8').toString('hex');

    _transform(chunk, _, next) {

        const { name, email, password } = chunk;
        const newData = {
            source:'ui',
            payload: {
                name,
                email: this.#hexEncode(email),
                password: this.#hexEncode(password),
            }
        };

        this.push(newData);
        next();
    }
}

module.exports = { Guardian };
