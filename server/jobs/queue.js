const { Queue } = require('bullmq');
const IORedis = require('ioredis');

const connection = new IORedis(); // Will use REDIS default config or .env

const jobQueue = new Queue('job-queue', {
  connection,
});

module.exports = jobQueue;
