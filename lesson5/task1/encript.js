const { scrypt, randomFill, createCipheriv } = require('crypto');
const { promisify } = require('util');

const scryptAsync = promisify(scrypt);
const randomFillAsync = promisify(randomFill);

const encrypt = async (data) =>{
    const algorithm = 'aes192';
    const password = '1qaZxsw2@3edcVfr4';
    const buf = Buffer.alloc(16);

    const key = await scryptAsync(password, 'salt', 24).then((buffer) => {
        return buffer;
    }).catch(error => {
        throw error;
    });

    const iv = await randomFillAsync(buf).then((buffer) => {
        return buffer;
    }).catch(error => {
        throw error;
    });

    const cipher = createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(data);
    encrypted += cipher.final('hex');

    return encrypted;
}

module.exports = { encrypt };
