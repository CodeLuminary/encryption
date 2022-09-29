// note: encoded data is NOT encrypted

const crypto = require('crypto');
const secret = '20BBEBB8-DCC1-4544-AD32-7F3973CCED7A';

function createDigest(encodedData, format) {
  return crypto
    .createHmac('sha256', secret)
    .update(encodedData)
    .digest(format);
}

function encode(sourceData) {
  const json = JSON.stringify(sourceData);
  const encodedData = Buffer.from(json).toString('base64');
  return `${encodedData}!${createDigest(encodedData, 'base64')}`;
}

function decode(value) {
  let [encodedData, sourceDigest] = value.split('!');
  if (!encodedData || !sourceDigest) throw new Error('invalid value(s)');
  const json = Buffer.from(encodedData, 'base64').toString('utf8');
  const decodedData = JSON.parse(json);
  const checkDigest = createDigest(encodedData);
  const digestsEqual = crypto.timingSafeEqual(
    Buffer.from(sourceDigest, 'base64'),
    checkDigest
  );
  if (!digestsEqual) throw new Error('invalid value(s)');
  return decodedData;
}

const data = { name: 'brian' };
const encoded = encode(data);
const decoded = decode(encoded);

console.log('original data', data);
console.log('encoded as', encoded);
console.log('encoded size', Buffer.byteLength(encoded, 'utf8'));
console.log('decoded as', decoded);