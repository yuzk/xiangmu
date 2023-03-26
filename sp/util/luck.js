// Redis链接建立
const { createClient } = require('redis');

const redis = createClient();


redis.on('error', (err) => console.log('Redis Client Error', err));



module.exports = redis;