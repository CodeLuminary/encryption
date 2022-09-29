const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

//Salting is use as a proof of work algorithm used in crypto

function signup(email, password) {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');

    const user = { email, password: `${salt}:${hashedPassword}` }
  
    users.push(user);

    return user
}

function login(email, password) {
    const user = users.find(v => v.email === email);
  
    const [salt, key] = user.password.split(':');
    const hashedBuffer = scryptSync(password, salt, 64);
    console.log(hashedBuffer, "hashedBuffer")
  
    const keyBuffer = Buffer.from(key, 'hex');
    console.log(keyBuffer, "Key");
    const match = timingSafeEqual(hashedBuffer, keyBuffer); //This prevents a timing attack
    
    if (match) {
        return 'login success!'
    } else {
        return 'login fail!'
    }
}

const users = [];

const user = signup('foo@bar.com', 'pa$$word');

console.log(user, "This is user")

const result = login('foo@bar.com', 'pa$$word')

console.log(result, "Result")
