const { createCipheriv, randomBytes, createDecipheriv } = require('crypto');

/// Cipher

const message = 'i like turtles';
const key = randomBytes(32); console.log(key, "key");
const iv = randomBytes(16); console.log(iv, "iv");

//This uses the aes256 encryption algorithm
const cipher = createCipheriv('aes256', key, iv); console.log(cipher, "cipher")

/// Encrypt

const encryptedMessage = cipher.update(message, 'utf8', 'hex') + cipher.final('hex');
console.log(`Encrypted: ${encryptedMessage}`, "Encrypted data");

/// Decrypt

const decipher = createDecipheriv('aes256', key, iv); console.log(decipher, "decipher");
const decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf-8') + decipher.final('utf8');
console.log(`Deciphered: ${decryptedMessage.toString('utf-8')}`, decipher);
