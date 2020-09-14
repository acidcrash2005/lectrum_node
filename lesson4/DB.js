const { EventEmitter } = require('events');

class DB extends EventEmitter {
    #data;

    constructor() {
        super();

        this.onData();
        this.#data = [];
    }

    onData = () => {
        this.on('data', (data) => {
            const {source, payload} = data;

            this.#data.push({
                source,
                payload,
                created: new Date()
            });
        })
    }

}

module.exports = { DB };
