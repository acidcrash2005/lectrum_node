const { Transform } = require('stream');
const { encrypt } = require('./encript');

class Guardian extends Transform {
    constructor(options = {
        readableObjectMode: true,
        writableObjectMode: true
    }) {
        super(options);
    }

    async _transform(chunk, _, next) {
        const { name, email, password } = chunk;

        const encryptEmailPromise = encrypt(email).then((encryptedEmail) => encryptedEmail);
        const encryptPasswordPromise = encrypt(password).then((encryptedPassword) => encryptedPassword);

        Promise.all([
            encryptEmailPromise,
            encryptPasswordPromise
        ]).then(([email, password]) => {
            this.push({
                mata:{
                    source: 'ui'
                },
                payload: {
                    name,
                    email,
                    password,
                }
            });

            next();
        }).catch(error => {
            throw error
        })
    }
}

module.exports = Guardian;
