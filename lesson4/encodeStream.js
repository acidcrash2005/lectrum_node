const { pipeline } = require('stream');
const { UiEncode } = require('./Ui');
const { AccountManager } = require('./AccountManager');
const { Guardian } = require('./Guardian');
const { Logger } = require('./Logger');

const customers = [
    {
        name: 'Pitter Black',
        email: 'pblack@email.com',
        password: 'pblack_123',
    },
    {
        name: 'Oliver White',
        email: 'owhite@email.com',
        password: 'owhite_456'
    }
];
const uiEncode = new UiEncode(customers);
const guardian = new Guardian();
const manager = new AccountManager();
const logger = new Logger();

pipeline(
    uiEncode,
    guardian,
    logger,
    manager,
    (error) => {
        if(error){
            console.log(error);
        }
    }
)

// uiEncode.pipe(guardian).pipe(logger).pipe(manager);

