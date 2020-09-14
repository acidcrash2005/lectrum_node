const { Transform } = require('stream');

class Guardian extends Transform {
    constructor(options = {
        readableObjectMode: true,
        writableObjectMode: true
    }) {
        super(options);
    }

    #hexEncode = (data) => Buffer.from(data, 'utf8').toString('hex');

    _transform(chunk, encoding, callback) {
        if(!chunk){
            this.pause();
            return
        }

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
        callback();
    }
}

module.exports = { Guardian };
