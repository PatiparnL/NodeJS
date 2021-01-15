const app = require('./app');
const db = require('./db');
const dbtest = require('./dbtest.js');

if (process.env.NODE_ENV === 'test')
{
    // dbtest.connectTest().then(() =>
    // {
    //     app.listen(4000, () =>
    //     {
    //     });
    // });
}
else
{
    db.connectProd().then(() =>
    {
        app.listen(process.env.PORT || 4000, () =>
        {
        });
    });
}
