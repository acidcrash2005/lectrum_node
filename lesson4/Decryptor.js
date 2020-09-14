const { Transform } = require('stream');

class Decryptor extends Transform {
    constructor(options = {
        readableObjectMode: true,
        writableObjectMode: true
    }) {
        super(options);
    }

    #hexEncode = (data) => Buffer.from(data, 'hex').toString();
    #base64Encode = (data) => Buffer.from(data, 'base64').toString();

    _transform(chunk, encoding, callback) {
        if(!chunk){
            this.pause();
            return
        }

        const {
            payload:{
                name,
                email,
                password
            },
            meta: { algorithm }
        } = chunk;

        const newData = {
            source:'ui',
            payload: {
                name,
                email: algorithm === 'hex' ? this.#hexEncode(email) : this.#base64Encode(email),
                password: algorithm === 'hex' ? this.#hexEncode(password) : this.#base64Encode(password),
            }
        };

        this.push(newData);
        callback();
    }
}

module.exports = { Decryptor };
