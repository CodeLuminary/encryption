const { createHash } = require('crypto');

// Create a string hash

function hash(str) {
    //Examples of hashing algorithm are SHA, MD5, argon2
    return createHash('sha256').update(str).digest('hex'); //Format can also be in base64
}

// Compare two hashed passwords

let password = 'hi-mom!';
const hash1 = hash(password);
console.log(hash1, "First Password")

/// ... some time later

password = 'hi-mom';
const hash2 = hash(password);
const match = hash1 === hash2;

console.log(match ? '✔️  good password' : '❌  password does not match');
