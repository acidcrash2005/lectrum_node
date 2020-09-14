const { UiDecode } = require('./Ui');
const { Decryptor } = require('./Decryptor');
const { AccountManager } = require('./AccountManager');

const customers = [
    {
        payload: {
            name: 'Pitter Black',
            email: '70626c61636b40656d61696c2e636f6d',
            password: '70626c61636b5f313233'
        },
        meta: {
            algorithm: 'hex'
        }
    }
];

const uiDecode = new UiDecode(customers);
const decryptor = new Decryptor();
const manager = new AccountManager();


uiDecode.pipe(decryptor).pipe(manager);

