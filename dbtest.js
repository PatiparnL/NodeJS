const mongoose = require('mongoose');
const config = require('config');
const DB_URI = config.get('connectionstring');

mongoose.Promise = global.Promise;

function connectTest()
{
  return new Promise((resolve, reject) =>
  {
    mongoose.connect(DB_URI,
      { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
      .then((res, err) =>
      {
        if (err) return reject(err);
        resolve();
      })
      
    // const Mockgoose = require('mockgoose').Mockgoose;
    // const mockgoose = new Mockgoose(mongoose);

    // mockgoose.prepareStorage()
    //   .then(() =>
    //   {
    //     mongoose.connect(DB_URI,
    //       { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true })
    //       .then((res, err) =>
    //       {
    //         if (err) return reject(err);
    //         resolve();
    //       })
    //   })
  });
}

function close()
{
  return mongoose.disconnect();
}

module.exports = { connectTest, close };