const EventEmitter = require('events');

class Bank {
    #users;
    #events;

    #validateExistUser;
    #validateLessBalance;
    #validateIsNumber;
    #validateLimit;

    #dropError;

    constructor() {
        this.#users = new Map;
        this.#events = new EventEmitter();

        // Errors
        this.#dropError = (text)=> {
            this.#events.emit('error',new Error(text));
        };

        // Validators
        this.#validateExistUser = ({userIds, isUniqName})=> {
            if(isUniqName){
                this.#users.forEach((user)=>{
                    if(user.name === userIds){
                        this.#dropError(`User ${userIds} already exist!`);
                    }
                })

                return
            }

            userIds.forEach(id => {
                if(!this.#users.get(id)){
                    this.#dropError(`UserId "${id}" don\`t exist in base!`);
                }
            })
        };
        this.#validateLessBalance = (balance, customText)=> {
            if(balance <= 0){
                this.#dropError(customText || `The accrued balance cannot be less than zero`);
            }
        };
        this.#validateIsNumber = (value, nameValue)=> {
            if(typeof value !== 'number'){
                this.#dropError(`${nameValue} should be type as number!`);
            }
        };
        this.#validateLimit = ({ user, amount, currentBalance, updatedBalance }) => {
            const isLimit = user.limit !== void 0;
            const isLimitFailed = isLimit && !user.limit(amount, currentBalance, updatedBalance);

            if(isLimitFailed){
                this.#dropError('Limit operation error!');
            }
        };

        // Events
        this.#events.on('add', (userId, balance) => {
            this.#validateExistUser({userIds:[userId]});
            this.#validateLessBalance(balance);
            this.#validateIsNumber(balance, 'Add value');

            const user = this.#users.get(userId);

            this.#users.set(userId, {
                ...user,
                balance: user.balance + balance
            });
        })
        this.#events.on('get', (userId, callback) => {
            this.#validateExistUser({userIds:[userId]});
            const user = this.#users.get(userId);

            callback(user.balance);
        })
        this.#events.on('withdraw', (userId, withdraw) => {
            this.#validateExistUser({userIds:[userId]});
            this.#validateIsNumber(withdraw, 'Withdraw');
            this.#validateLessBalance(withdraw, 'Withdraw сan not be less than or equal to zero!');

            const user = this.#users.get(userId);
            const newBalance = user.balance - withdraw;
            this.#validateLessBalance(newBalance);
            this.#validateLimit({
                user,
                amount: withdraw,
                currentBalance: user.balance,
                updatedBalance: newBalance
            });

            this.#users.set(userId,{
                ...user,
                balance: newBalance
            })
        })
        this.#events.on('send',(sendUserId,receiveUserId, amount) => {
            this.#validateExistUser({userIds:[sendUserId, receiveUserId]});
            this.#validateLessBalance(amount, 'Amount сan not be less than or equal to zero!');
            this.#validateIsNumber(amount, 'Amount');

            const sender = this.#users.get(sendUserId);
            const receiver = this.#users.get(receiveUserId);

            const newSenderBalance = sender.balance - amount;
            this.#validateLessBalance(newSenderBalance, `User ${sendUserId} - ${sender.name} does not have enough funds in the account!`);
            this.#validateLimit({
                user:sender,
                amount,
                currentBalance: sender.balance,
                updatedBalance: newSenderBalance
            });

            const newReceiverBalance = receiver.balance + amount;

            this.#users.set(sendUserId, {
                ...sender,
                balance: newSenderBalance
            }).set(receiveUserId, {
                ...receiver,
                balance: newReceiverBalance
            })
        })
        this.#events.on('changeLimit',(userId, limit) => {
            this.#validateExistUser({userIds:[userId]});

            if(typeof limit !== 'function'){
                throw new Error('ChangeLimit callback should be a function!');
            }

            const user = this.#users.get(userId);
            this.#users.set(userId,{
                ...user,
                limit
            })
        });

    }

    register(user) {
        const {name, balance} = user;
        this.#validateExistUser({userId:name, isUniqName: true});
        this.#validateLessBalance(balance);

        const userId = Math.random().toString(36).substr(2,9) + Date.now();

        this.#users.set(userId, user);

        return userId
    }

    emit(eventName, ...data){
        this.#events.emit(eventName,...data);
    }

}

module.exports = {
    Bank
}
