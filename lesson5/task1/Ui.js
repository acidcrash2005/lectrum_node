const { Readable } = require('stream');

class Ui extends Readable {
    constructor(data, options = { objectMode:true }) {
        super(options);

        this.#validate(data);
        this.data = data;
    }

    #validate = (users) => {
        const requireFields = ['name', 'email','password'];

        users.forEach(user => {
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

        if(!chunk){
            this.push(null);
            return;
        }

        this.push(chunk);
        this.data = data;
    }
}

module.exports = Ui;
