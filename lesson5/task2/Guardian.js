const { Transform } = require('stream');
const { encrypt } = require('./encript');

class Guardian extends Transform {
    constructor(
        options = {
            readableObjectMode: true,
            writableObjectMode: true,
        }
    ) {
        super(options);
    }

    async _transform(chunk, _, next) {
        const signature = encrypt(chunk);
        const { name, email, password } = chunk;

        this.push({
            mata: {
                source: 'ui',
                signature,
            },
            payload: {
                name,
                email,
                password,
            },
        });

        next();
    }
}

module.exports = Guardian;
