const { Readable } = require('stream');

class UiEncode extends Readable{
    constructor(data, options = { objectMode:true }) {
        super(options);

        this.#validate(data);
        this.data = data;
    }

    #validate = (data) => {
        const requireFields = ['name', 'email','password'];

        data.forEach(user => {
            if(Object.keys(user).length > requireFields.length){
                throw new Error('Data should contain just "name", "email","password" fields!');
            }

            requireFields.forEach(field => {
                if(!user.hasOwnProperty(field)){
                    throw new Error(`${field} is required field of user data!`);
                }

                if(typeof user[field] !== 'string'){
                    throw new Error(`${field} is not type of string!`);
                }
            })
        })
    }


    _read() {
        const [chunk, ...data] = this.data;

        if(!data){
            this.pause();
            return
        }

        this.push(chunk);
        this.data = data;
    }
}

class UiDecode extends Readable {
    constructor(data, options = { objectMode:true }) {
        super(options);

        this.#validate(data);
        this.data = data;
    }

    #validate = (data) => {
        const requireFields = ['payload', 'meta'];
        const payloadFields = ['name', 'email','password'];

        data.forEach(user => {
            if(Object.keys(user).length > requireFields.length){
                throw new Error('Data should contain just "payload" and "meta" fields!');
            }

            if(typeof user.payload !== 'object'){
                throw new Error('User "payload" should be an object!');
            }

            if(typeof user.meta !== 'object'){
                throw new Error('User "meta" should be an object!');
            }

            payloadFields.forEach(field => {
                if(!user.payload.hasOwnProperty(field)){
                    throw new Error(`${field} is required field of user data!`);
                }

                if(typeof user.payload[field] !== 'string' && typeof user.payload[field] !== ''){
                    throw new Error(`${field} is required required and should be a string!`);
                }
            })

            if(!user.meta.hasOwnProperty('algorithm') ){
                throw new Error('User "meta" should have "algorithm" key!');
            }

            if(typeof user.meta.algorithm !== 'string' && user.meta.algorithm === ''){
                throw new Error('User "meta.algorithm" required and should be a string!');
            }

            if(user.meta.algorithm !== 'hex' && user.meta.algorithm !== 'base64'){
                throw new Error('User "meta.algorithm" should be a "hex" or "base64"!');
            }
        })
    }


    _read() {
        const [chunk, ...data] = this.data;

        if(!data){
            this.pause();
            return
        }

        this.push(chunk);
        this.data = data;
    }
}

module.exports = { UiEncode, UiDecode };
