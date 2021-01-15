var cron = require('node-cron');

module.exports = (app) =>
{
    var task = cron.schedule('* * * * *', () =>
    {
        console.log('running a task every minute');
    });

    task.stop();
}