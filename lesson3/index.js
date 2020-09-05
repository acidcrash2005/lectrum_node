const { Bank } = require('./bank');

const bank = new Bank();

const p1 = {
    name: 'Pitter Black',
    balance: 905,
    limit: amount => amount < 10
}

const p2 = {
    name: 'Jorg White',
    balance: 100
}

const personId = bank.register(p1);
const personSecondId = bank.register(p2);

// bank.emit('add', personId, 300);
// bank.emit('get', personId, (balance) => {
//     console.log(`${p1.name} have ${balance}₴`);
// });
// bank.emit('withdraw', personId, 10);
//
// bank.emit('get', personId, (balance) => {
//     console.log(`${p1.name} after withdraw ${balance}₴`);
// });
//
bank.emit('get', personId, (balance) => {
    console.log(`${p1.name} have ${balance}₴`);
});
bank.emit('get', personSecondId, (balance) => {
    console.log(`${p2.name} have ${balance}₴`);
});

bank.emit('send', personId, personSecondId, 10);

bank.emit('get', personId, (balance) => {
    console.log(`${p1.name} have ${balance}₴`);
});
bank.emit('get', personSecondId, (balance) => {
    console.log(`${p2.name} have ${balance}₴`);
});

// Вариант 1
// bank.emit('changeLimit', personId, (amount, currentBalance,
//                                     updatedBalance) => {
//     return amount < 100 && updatedBalance > 700;
// });
// bank.emit('withdraw', personId, 5); // Error

// Вариант 2
// bank.emit('changeLimit', personId, (amount, currentBalance, updatedBalance) => {
//     return amount < 100 && updatedBalance > 700 && currentBalance > 800;
// });

// Вариант 3
// bank.emit('changeLimit', personId, (amount, currentBalance) => {
//     return currentBalance > 800;
// });


// Вариант 4
// bank.emit('changeLimit', personId, (amount, currentBalance, updatedBalance) => {
//     return updatedBalance > 900;
// });

