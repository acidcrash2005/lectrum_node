const { Readable } = require('stream');

class Ui extends Readable{
    constructor(data, options = {
        encoding: 'utf8'
    }) {
        super(options);

        this.init();
        this.data = data;
    }

    init(){
        this.on('data', chunk => {
            console.log(chunk);
        })

    }

    _read() {
        const data = this.data.shift();

        if(!data){
            this.pause();
            return
        }

        this.push(data);
    }
}

const array = ['1', '2', '3'];

const rs = new Ui(array);

exports.default = Ui;
