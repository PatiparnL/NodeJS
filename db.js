const mongoose = require('mongoose');
const config = require('config');
const DB_URI = config.get('connectionstring');

mongoose.Promise = global.Promise;
var db = mongoose.connection;

function connectProd()
{
  return new Promise((resolve, reject) =>
  {
    mongoose.connect(DB_URI,
      { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true, server: { auto_reconnect: true } })
      .then((res, err) =>
      {
        if (err) return reject(err);
        resolve();
      })
    db.on('error', (error) =>
    {
      close()
    });
    db.on('disconnected', () =>
    {
      mongoose.connect(DB_URI,
        { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true, server: { auto_reconnect: true } })
        .then((res, err) =>
        {
          if (err) return reject(err);
          resolve();
        })
    });
  });
}

function close()
{
  return mongoose.disconnect();
}

module.exports = { connectProd, close };